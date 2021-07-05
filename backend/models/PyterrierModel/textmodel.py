import pyterrier as pt


class TF_IDFModel:
    """
    Attributes:
        index_path (str): path to index/data.properties
    """

    def __init__(self, index_path):
        index_path = "/Users/gui/Development/repos/retrievalsystem/backend/models/PyterrierModel/wt2g_index/data" \
                     ".properties"
        if not pt.started():
            pt.init()
        self.index = pt.IndexFactory.of(index_path)

    def predict(self, query, N=5):
        tf_idf = pt.BatchRetrieve(self.index, wmodel="TF_IDF", properties={"tokeniser": "UTFTokeniser"})
        result = tf_idf.search(query)
        docnolist = result['docno'].values.tolist()
        thelist = docnolist[:N]
        return thelist