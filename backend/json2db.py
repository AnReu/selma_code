import sys
import json
import db_connection as db_connect


def insert_to_searchables(db_path, json_path):
    db = db_connect.DB(db_path)
    con, cur = db.create_connection()

    with open(json_path, 'r') as f:
        data = json.load(f)

    for date in data:
        cur.execute('INSERT INTO searchables (exchange_id, text, is_question) VALUES (?,?,?)',
                    (int(date['id']), date['text'], int(date['is_question'])))

    con.commit()
    con.close()


if __name__ == '__main__':
    # 1 is db file
    # 2 is json file
    insert_to_searchables(sys.argv[1], sys.argv[2])
