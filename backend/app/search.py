from html.parser import HTMLParser
import os
import re
import sys
from pathlib import Path
from backend.models.VectorModel import predictor as vector_predictor
import backend.models.PyterrierModel as PyterrierModel
import backend.models.PyterrierColbert as PyterrierColbert
from backend.config import Config
from backend.app.db_connection import DB


from .HTMLCutter import HTMLCutter

PROJECT_DIR = str(Path(__file__).parents[2]) + "/"
sys.path.insert(0, PROJECT_DIR)

cutter = HTMLCutter(700, 2000)


def search(
    db_name,
    text=None,
    code=None,
    equation=None,
    id=None,
    exchange=None,
    model=None,
    model_language=None,
    index=None,
    page=1,
):
    result_ids = []
    error = ""
    status = 200

    db = DB(Config.get_db_path(db_name))
    content_attribute_name = Config.get_db_content_attribute_name()  # TODO rename var
    db_table_name = Config.get_db_table_name()
    index_path = Config.get_index_path(db=db_name, model=model, index=index)

    try:
        if model == "VectorModel":
            predictor = vector_predictor.Predictor(index_path)
        elif model == "PyterrierModel":
            PyterrierModel.update_model(index_path)
            predictor = PyterrierModel
        elif model == "PyterrierColbert":
            ckpt_path = os.path.join(index_path, "colbert-10000.dnn")
            PyterrierColbert.update_model(index_path, ckpt_path)
            predictor = PyterrierColbert
    except Exception as error:
        print(f"Predictor could not be found for the given model ({model})")
        print(error)
        raise

    if id is None:
        try:
            all_result_ids = predictor.predict(text, code, equation, n=100)
        except KeyError:
            result_ids = []
            error = "Key Error: word not in vocabulary"
            status = 404
    elif exchange == ["physics", "stackexchange"]:
        exchange_id = int(id)

        con, cur = db.create_connection()
        query = "SELECT {} FROM {} WHERE exchange_id={}".format(
            "id", db_table_name, exchange_id
        )
        cur.execute(query)
        id = cur.fetchone()
        con.close()

        if not id:
            error = "ID not present"
            status = 404
        else:
            all_result_ids = predictor.predict_by_id(id[0])

    # Start Pagination block
    count = len(all_result_ids)
    per_page = 10  # define how many results you want per page
    pages = count // per_page  # this is the number of pages
    offset = (page - 1) * per_page  # offset for SQL query
    limit = 20 if page == pages else per_page  # limit for SQL query

    page_ids = all_result_ids[offset : offset + per_page]
    # End Pagination block

    data = db.get_results_by_id(db_table_name, page_ids)
    column_names = db.get_column_names(db_table_name)

    results = results_to_json(data, [description[0] for description in column_names])

    for result in results:
        result[content_attribute_name], result["cut"] = trim_html(
            result[content_attribute_name]
        )
        result["relevant_sentence"] = get_relevant_sentence(result)

    response = {"results": results, "error": error}, status

    return response


def results_to_json(results, column_names):
    return_value = []
    for result in results:
        element = {}
        for title in column_names:
            index = column_names.index(title)
            element[title] = result[index]

        return_value.append(element)
    return return_value


def trim_html(html):
    return cutter.cut(re.subn(r"<img[^>]*>", "<strong>[Image]</strong>", html)[0])


def get_relevant_sentence(result):
    return Parser.get_first(result[Config.get_db_content_attribute_name()])


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.first_data = ""

    def handle_data(self, data):
        data = data.strip()
        if data == "":
            return
        if self.first_data == "":
            self.first_data = data

    @staticmethod
    def get_first(data):
        line_limit = 130
        parser = Parser()
        parser.feed(data)

        first_sentence = "".join(re.split("([.?!])", parser.first_data, 1)[:2]).replace(
            "\n", ""
        )
        if len(first_sentence) > line_limit:
            first_sentence = Parser.__handle_long_sentence(first_sentence, line_limit)
        return first_sentence

    @staticmethod
    def __handle_long_sentence(first_sentence, line_limit):
        soft_limit = 30

        eq_list = Parser.__find_equations(first_sentence)
        current_length = 0
        sentence = ""
        critical_segment = ""

        for index, el in enumerate(eq_list):
            current_length += len(el)
            if current_length > line_limit:
                critical_segment = el
                break
            else:
                sentence += el

        if len(sentence) + soft_limit < line_limit:
            if len(sentence) + len(critical_segment) <= line_limit + soft_limit:
                sentence += critical_segment
            else:
                if critical_segment[0] == "$":
                    if current_length > 0:
                        pass
                    else:
                        sentence = critical_segment
                        current_length = len(critical_segment)
                else:
                    code_list = Parser.__find_code(critical_segment)
                    for index, el in enumerate(code_list):
                        current_length += len(el)
                        if current_length > line_limit:
                            critical_segment = el
                            break
                        else:
                            sentence += el
                    if critical_segment[:3] == "```":
                        pass
                    else:
                        last_space_index = Parser.__get_last_index(
                            critical_segment[: line_limit - current_length], " "
                        )
                        sentence += critical_segment[:last_space_index]
        return sentence

    @staticmethod
    def __find_equations(string):
        blocks = re.split("(\$\$)", string)
        blocks = Parser.__concat_with_delimiter(blocks)
        results = []

        for index, element in enumerate(blocks):
            if index % 2 == 0:
                inlines = re.split("(\$)", element)
                results.extend(Parser.__concat_with_delimiter(inlines))
            else:
                results.append(element)
        return results

    @staticmethod
    def __find_code(string):
        blocks = re.split("(```)", string)
        return Parser.__concat_with_delimiter(blocks)

    @staticmethod
    def __concat_with_delimiter(data):
        delimiter = ""
        results = []
        for index, element in enumerate(data):
            if index % 4 == 0:
                results.append(element)
            if index % 4 == 1:
                delimiter = element
            if index % 4 == 2:
                results.append(delimiter + element + delimiter)
        return results

    @staticmethod
    def __get_last_index(str, substr):
        index = len(str) - 1 - str[::-1].find(substr)
        return index if index < len(str) else -1
