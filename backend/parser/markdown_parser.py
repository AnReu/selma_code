from parser.tex_parser import search as eq_search

MATH_BLOCK_DELIMITERS = [
    {
        'begin': '$$',
        'end': '$$',
        'type': 'block',
    },
]
MATH_INLINE_DELIMITERS = [
    {
        'begin': '$',
        'end': '$',
        'type': 'inline',
    },
]
CODE_DELIMITER = [
    {
        'begin': '```',
        'end': '```',
        'type': 'block',
    },
]


def search(file):
    text, equation = eq_search(file, block_delimiter=MATH_BLOCK_DELIMITERS,
                               inline_delimiter=MATH_INLINE_DELIMITERS, file_type='md')
    text, code = eq_search(text, block_delimiter=CODE_DELIMITER,
                           inline_delimiter=[], file_type='md')

    return ' '.join(text), code, equation
