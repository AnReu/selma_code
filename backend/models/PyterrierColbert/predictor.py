import pyterrier as pt
import faiss
assert faiss.get_num_gpus() > 0
import torch

"""
ToDos for GUI:
please note that this predictor only needs a query
pls include the checkpoint path checkpointpath="/home/s7949670/retrievalsystem/data/PyTerrierModel/pyterrierColbert/colbert-10000.dnn"
and the index path colbertindexpath = "/home/s7949670/retrievalsystem/data/PyTerrierModel/pyterrierColbert"
"""

class ColbertCodeSearchNet:
    """
    Attributes:
        index_path (str): path to index/data.properties
    """

    def __init__(self, checkpointpath, colbertindexpath):
        if not pt.started():
            pt.init()
            from pyterrier_colbert.indexing import ColBERTIndexer
            from pyterrier_colbert.ranking import ColBERTFactory
        self.pyterrier_colbert_factory = ColBERTFactory(checkpointpath, colbertindexpath, "colbert_java_index")
        #this is the thing that needs a lot of time. i dont know at what time this gets initialised, but maybe we do
        # this when starting the retrievalsystem at all
    def predict(self, query, n=5):
        colbert_e2e = self.pyterrier_colbert_factory.end_to_end()
        result = colbert_e2e.search(query)
        docnolist = result["docno"].values.tolist()
        thelist = docnolist[:n]
        return thelist



class Predictor:
    """Predictor for most similar documents."""

    def __init__(self, checkpointpath, colbertindexpath):
        print("initialisation of the PyTerrierColbert.predictor")
        # path to the data.properties of the used index
        self.model = ColbertCodeSearchNet(checkpointpath, colbertindexpath)

    def predict(self, text, code, equations, n=5):
        """Predicts the top N most similar document ids given text, code and equations (str)."""
        print("colbert_predictor is used and this is the query:")
        print(text)
        return  self.model.predict(text, n)

    """def predict_by_id(self, id, n=5):
        return self.eq_model.predict_by_id(id, N)"""
