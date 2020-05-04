Start UI with:
```
cd frontend && npm start
```

Start api with:
```
FLASK_APP=backend/api.py flask run
```

For debugging mode start api with:
```
FLASK_APP=backend/api.py FLASK_ENV=development flask run
```

# Database
You need to create a sqlite db file name it `db.db` and place it in `data/`.

\
To create the tables run:
```commandline
python3 backend/db_connection.py data/db.db
```

\
To fill table `searchables` with documents run:
```commandline
python3 backend/json2db.py data/db.db YOUR_FILE_WITH_DOCUMENTS.json
```