import re

from .utility import get_eqation_start, find_inline_equations

MATH_BLOCK_DELIMITERS = [
    {
        'begin': r'\begin{align}',
        'end': r'\end{align}',
        'type': 'block',
    },
    {
        'begin': r'\begin{equation}',
        'end': r'\end{equation}',
        'type': 'block',
    },
    {
        'begin': r'\begin{equation*}',
        'end': r'\end{equation*}',
        'type': 'block',
    },
    {
        'begin': '$$',
        'end': '$$',
        'type': 'block',
    },
    {
        'begin': r'\[',
        'end': r'\]',
        'type': 'block',
    },
]

MATH_INLINE_DELIMITERS = [
    {
        'begin': '$',
        'end': '$',
        'type': 'inline',
    },
    {
        'begin': r'\(',
        'end': r'\)',
        'type': 'inline',
    },
]


def search(file, block_delimiter=MATH_BLOCK_DELIMITERS, inline_delimiter=MATH_INLINE_DELIMITERS, file_type='tex'):
    text = []
    equations = []
    in_equation = False
    end_delimiter = None

    for line in file:
        if hasattr(line, 'decode'):
            line = line.decode()

        # remove comments
        if file_type == 'tex':
            if line.startswith('%'):
                continue
            index = line.find('%')
            if index != -1:
                line = line[:index]

        line = line.strip()

        if line == '':
            continue

        if in_equation:
            # in block equation
            end_eq = line.find(end_delimiter)
            if end_eq != -1:
                in_equation = False
                equations[-1] = equations[-1] + line[:end_eq]
                line = line[end_eq + len(end_delimiter):]
            else:
                equations[-1] = equations[-1] + line
        else:
            # check for block equation
            eq_start = get_eqation_start(line, block_delimiter)
            if eq_start[0] != -1:
                in_equation = True
                end_delimiter = eq_start[2]
                start = eq_start[0]
                text.append(line[:start - len(eq_start[1])])
                end_eq = line.find(end_delimiter, start)
                if end_eq != -1:
                    in_equation = False
                    equations.append(line[start:end_eq])
                    line = line[end_eq + len(end_delimiter):]
                else:
                    equations.append(line[start:])

        if not in_equation:
            # check for inline equation
            inline_equations, inline_text = find_inline_equations(line, inline_delimiter)
            equations.extend(inline_equations)
            text.append(inline_text)
    if file_type == 'tex':
        return remove_tex_commands(' '.join(text)), equations
    return text, equations


def remove_tex_commands(text):
    title = ''
    match = re.search(r'\\[\w]*title[\w]*{([^}]*)}', text)
    if match:
        title = match.group(1)

    text = re.sub(r'[\w\W]*\\begin{document}', '', text, count=1)
    text = re.sub(r'\\end{document}[\w\W]*', '', text, count=1)

    offset = 0
    for match in re.finditer(r'\\(?:section|subsection){([^\\{}]*)}', text):
        text = text[:match.end(1) + offset + 1] + ' ' + match.group(1) + ' ' + text[match.end(1) + offset + 1:]
        offset += len(match.group(1)) + 2

    # remove all tables tab.* because of table, table*, tabular, tabular*, tabularx etc.
    text = re.sub(r'\\begin{(tab.*)}[\w\W]*\\end{\1}', '', text)
    # remove all footnotes (may contain tex commands)
    text = re.sub(r'\\footnote{[^\\{}]*(?:\\[^{\[\s]+(?:{[^\\{}]*})*(?:\[[^\[\]]*(?:(?:\[[^\[\]]*\])?[^\[\]]*)*\])?(?:{[^\\{}]*})*[^\\{}]*)*}', '', text)
    # match any tex command
    text = re.sub(r'\\[^{\[\s]*(?:{[^\\{}]*})*(?:\[[^\[\]]*(?:(?:\[[^\[\]]*\])?[^\[\]]*)*\])?(?:{[^\\{}]*})*', '', text)

    text = re.sub('{}', '', text)
    return title + ' ' + text
