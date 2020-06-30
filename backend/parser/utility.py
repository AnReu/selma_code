
def get_eqation_start(string, delimiters):
    """
    :param string: string that should be searched for equation start
    :param delimiters: array consisting of delimiter dicts with begin, end and type
    :return: 4-Tuple with index after delimiter, beginning, end and type of delimiter
    """
    return next(((string.find(delimiter['begin']) + len(delimiter['begin']), *tuple(delimiter.values()))
                 for delimiter in delimiters if string.find(delimiter['begin']) > -1),
                (-1, '', '', ''))
