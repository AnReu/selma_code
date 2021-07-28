import sys
import json
import db_connection as db_connect


def insert_to_searchables(db_path, json_path):
    db = db_connect.DB(db_path)
    con, cur = db.create_connection()

    with open(json_path, 'r') as f:
        data = json.load(f)

    id = 0
    for date in data:
        cur.execute('INSERT INTO searchables (id, exchange_id, text, is_question) VALUES (?, ?,?,?)',
                    (id, int(date['id']), date['text'], int(date['is_question'])))
        id += 1

    con.commit()
    con.close()


if __name__ == '__main__':
    # 1 is db file
    # 2 is json file
    insert_to_searchables(sys.argv[1], sys.argv[2])