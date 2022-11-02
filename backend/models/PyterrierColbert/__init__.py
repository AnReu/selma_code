import pyterrier as pt
import faiss

assert faiss.get_num_gpus() > 0
import torch

from pyterrier_colbert.indexing import ColBERTIndexer
from pyterrier_colbert.ranking import ColBERTFactory

ckpt_path = None
index_path = None
index = None
model = None


def update_model(new_index_path, new_ckpt_path):
    global index_path, index, ckpt_path, model

    if new_index_path != index_path or ckpt_path != new_ckpt_path:
        index_path = new_index_path
        ckpt_path = new_ckpt_path
        model = ColBERTFactory(ckpt_path, index_path, "colbert_java_index").end_to_end()


def predict(text, code, equation, n=5):
    global model

    result = model.search(text)
    docnolist = result["docno"].values.tolist()

    return docnolist[:n]
