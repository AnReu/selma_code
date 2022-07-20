import pyterrier as pt


class TF_IDFModel:
    """
    Attributes:
        index_path (str): path to index/data.properties
    """

    def __init__(self, index_path):
        if not pt.started():
            pt.init()
        self.index = pt.IndexFactory.of(index_path)

    def predict(self, query, n=5):
        tf_idf = pt.BatchRetrieve(
            self.index, wmodel="TF_IDF", properties={"tokeniser": "UTFTokeniser"}
        )
        result = tf_idf.search(query)
        docnolist = result["docno"].values.tolist()
        thelist = docnolist[:n]
        return thelist
