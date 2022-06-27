class ColbertCodeSearchNet:
    """
    Attributes:
        index_path (str): path to index/data.properties
    """

    def __init__(self, index_path):
        if not pt.started():
            pt.init()
        self.index = pt.IndexFactory.of(index_path)

    def predict(self, query, N=5):
        tf_idf = pt.BatchRetrieve(
            self.index, wmodel="TF_IDF", properties={"tokeniser": "UTFTokeniser"}
        )
        result = tf_idf.search(query)
        docnolist = result["docno"].values.tolist()
        thelist = docnolist[:N]
        return thelist


class Predictor:
    """Predictor for most similar documents."""

    def __init__(self, data_path):
        print("initialisation of the PyTerrierModel.predictor")
        # path to the data.properties of the used index
        self.model = ColbertCodeSearchNet(data_path)

    def predict(self, text, code, equations, n=5):
        """Predicts the top N most similar document ids given text, code and equations (str)."""
        print("predictor is used and this is the query:")
        print(text)
        if text:
            print("This is the return of the predictor:")
            print(self.model.predict(text, n))
            return self.model.predict(text, n)
        elif equations:
            return self.eq_model.predict(equations, n)
        else:
            return list(range(n))

    """def predict_by_id(self, id, N=5):
        return self.eq_model.predict_by_id(id, N)"""
