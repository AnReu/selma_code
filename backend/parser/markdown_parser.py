from markdown import Markdown
from io import StringIO

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
    text = ' '.join(line for line in text if line != '')\

    text = unmark(text)
    print(text)

    return text, code, equation


def unmark_element(element, stream=None):
    if stream is None:
        stream = StringIO()
    if element.text:
        stream.write(element.text)
    for sub in element:
        unmark_element(sub, stream)
    if element.tail:
        stream.write(element.tail)
    return stream.getvalue()


# patching Markdown
Markdown.output_formats["plain"] = unmark_element
__md = Markdown(output_format="plain")
__md.stripTopLevelTags = False


def unmark(text):
    return __md.convert(text)
