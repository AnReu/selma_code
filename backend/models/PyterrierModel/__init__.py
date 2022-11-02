import pyterrier as pt


index_path = None
index = None
model = None


def update_model(new_index_path):
    global index_path, index, model

    if new_index_path != index_path:
        index_path = new_index_path
        index = pt.IndexFactory.of(new_index_path)
        model = pt.BatchRetrieve(
            index, wmodel="BM25", properties={"tokeniser": "UTFTokeniser"}
        )


def predict(text, code, equation, n=5):
    global model
    result = model.search(text)
    docnolist = result["docno"].values.tolist()

    return docnolist[:n]
