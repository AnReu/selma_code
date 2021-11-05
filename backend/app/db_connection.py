import sys
import sqlite3


class DB:
    class __DB:
        def __init__(self, path):
            self.path = path

    instance = None

    def __init__(self, path):
        if not DB.instance:
            DB.instance = DB.__DB(path)
        else:
            DB.instance.path = path

    def create_connection(self):
        con = sqlite3.connect(self.instance.path)
        cur = con.cursor()
        return con, cur

    def create_structure(self):
        con, cur = self.create_connection()

        cur.execute(
            "CREATE TABLE IF NOT EXISTS Documents ("
            "id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "exchange_id INTEGER,"
            "text TEXT NOT NULL,"
            "is_question INTEGER"
            ");"
        )

        cur.execute(
            "CREATE TABLE IF NOT EXISTS relevances ("
            "id INTEGER,"
            "query TEXT,"
            "relevant TEXT,"
            "FOREIGN KEY (id) REFERENCES PO (id)"
            ")"
        )

        con.commit()
        con.close()

    def get_results_by_id(self, table_name, ids, columns=[]):
        if columns:
            columns = ", ".join(columns)
        else:
            columns = "*"
        con, cur = self.create_connection()
        query = "SELECT {} FROM {} WHERE id IN ({})".format(
            columns, table_name, ",".join(map(str, ids))
        )
        cur.execute(query)
        value = cur.fetchall()
        con.close()
        return value

    def get_column_names(self, table_name):
        con, cur = self.create_connection()
        query = "SELECT * FROM {} LIMIT 1".format(table_name)
        cur.execute(query)
        value = cur.description
        con.close()
        return value


if __name__ == "__main__":
    db = DB(sys.argv[1])
    db.create_structure()
