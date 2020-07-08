
def get_eqation_start(string, delimiters):
    """
    :param string: string that should be searched for equation start
    :param delimiters: array consisting of delimiter dicts with begin, end and type
    :return: 4-Tuple with index after delimiter, beginning, end and type of delimiter
    """
    return next(((string.find(delimiter['begin']) + len(delimiter['begin']), *tuple(delimiter.values()))
                 for delimiter in delimiters if string.find(delimiter['begin']) > -1),
                (-1, '', '', ''))


def find_inline_equations(line, inline_delimiter):
    text = ''
    equations = []

    eq_start = get_eqation_start(line, inline_delimiter)
    if eq_start[0] != -1:
        end_eq = line.find(eq_start[2], eq_start[0])
        equations.append(line[eq_start[0]:end_eq])
        text = line[:eq_start[0] - len(eq_start[1])]
        inline_equations, inline_text = find_inline_equations(line[end_eq + len(eq_start[2]):], inline_delimiter)
        equations.extend(inline_equations)
        text += inline_text
    else:
        text = line
    return equations, text
