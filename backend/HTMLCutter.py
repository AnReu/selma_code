from html.parser import HTMLParser
from html import unescape


class HTMLCutter(HTMLParser):

    def __init__(self, min_length: int, max_length: int):
        super().__init__()
        self.min_length = min_length
        self.max_length = max_length

        # reset
        self.opened_tags = []
        self.tags_to_remove = []
        self.finished = False
        self.current_length = 0
        self.data_list = []

    def reset(self):
        super().reset()
        self.finished = False
        self.opened_tags = []
        self.tags_to_remove = []
        self.current_length = 0
        self.data_list = []

    def handle_starttag(self, tag, attrs):
        if self.finished:
            return
        self.opened_tags.append(tag)

    def handle_endtag(self, tag):
        if self.finished:
            return
        self.opened_tags.reverse()
        self.opened_tags.remove(tag)
        self.opened_tags.reverse()

    def handle_data(self, data):
        data = data.strip('\n')
        if not data:
            return
        if self.finished:
            return
        if self.current_length + len(data) > self.max_length:
            self.finished = True
            data = data[:self.max_length - self.current_length]
        self.current_length += len(data)
        self.data_list.append(data)

        if self.current_length > self.min_length:
            self.finished = True

    def __find_cutting_point(self, data):
        search_data = unescape(data)
        cutting_point = 0

        for data_element in self.data_list:
            point = search_data.find(data_element, cutting_point)
            if point != -1:
                cutting_point = point

        cutting_point = cutting_point + len(self.data_list[len(self.data_list) - 1])
        html_special_char_offset = len(data[:cutting_point]) - len(unescape(data[:cutting_point]))
        return cutting_point + html_special_char_offset

    def cut(self, data: str):
        addition = ''
        closing_tags = ''
        self.reset()

        self.feed(data)

        cutting_point = self.__find_cutting_point(data)

        if cutting_point < self.min_length:
            cutting_point = len(data)
        else:
            self.opened_tags.reverse()
            closing_tags = ''.join('</{}>'.format(tag) for tag in self.opened_tags)

            if len(data.strip('\n')) != len(data[:cutting_point] + closing_tags):
                addition = ' ...'

        return data[:cutting_point] + addition + closing_tags, True if addition else False
