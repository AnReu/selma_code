Start UI with:
```
cd frontend && npm start
```

Start api with:
```
cd frontend && npm run start-api
```

# Database
You need to create a sqlite db file. The default location is `data/` and the default name is `db.db` 
if you want to change them you also need to change them in `backend/.flaskenv`.

\
To create the database run:
```commandline
cd data
sqlite3 db.db
```

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
An example for a .json file: see `data/dummy_data.json`