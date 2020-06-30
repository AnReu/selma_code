from tika import parser


def get_abstract(file):
    raw = parser.from_buffer(file)
    abstract_start = raw['content'].find('Abstract')
    abstract_end = raw['content'].find('\n\n', abstract_start)
    return raw['content'][abstract_start:abstract_end]
