import re

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


def search(file):
    text = ''
    equations = []
    in_equation = False
    end_delimiter = None

    for line in file:
        line = line.decode()

        # remove comments
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
                equations.append(line[:end_eq])
                line = line[end_eq + 1:]
            else:
                equations[-1] = equations[-1] + line
        else:
            # check for block equation
            eq_start = get_eqation_start(line, MATH_BLOCK_DELIMITERS)
            if eq_start[0] != -1:
                in_equation = True
                end_delimiter = eq_start[2]
                start = eq_start[0]
                end_eq = line.find(end_delimiter, start)
                if end_eq != -1:
                    in_equation = False
                    equations.append(line[start:end_eq + len(end_delimiter)])
                else:
                    equations.append(line[start:])

        if not in_equation:
            # check for inline equation
            inline_equations, inline_text = find_inline_equations(line)
            equations.extend(inline_equations)
            text += inline_text
    return remove_tex_commands(text), equations


def find_inline_equations(line):
    text = ''
    equations = []

    eq_start = get_eqation_start(line, MATH_INLINE_DELIMITERS)
    if eq_start[0] != -1:
        end_eq = line.find(eq_start[2], eq_start[0])
        equations.append(line[eq_start[0]:end_eq])
        text += line[:eq_start[0] - len(eq_start[1])]
        inline_equations, inline_text = find_inline_equations(line[end_eq + len(eq_start[2]):])
        equations.extend(inline_equations)
        text += inline_text
    else:
        text += line
    return equations, text


def get_eqation_start(string, delimiters):
    """
    :param string: string that should be searched for equation start
    :param delimiters: array consisting of delimiter dicts with begin, end and type
    :return: 4-Tuple with index after delimiter, beginning, end and type of delimiter
    """
    return next(((string.find(delimiter['begin']) + len(delimiter['begin']), *tuple(delimiter.values()))
                 for delimiter in delimiters if string.find(delimiter['begin']) > -1),
                (-1, '', '', ''))


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
