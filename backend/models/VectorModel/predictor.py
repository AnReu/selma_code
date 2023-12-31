import os
from backend.models.VectorModel.model import (
    VectorModel,
    WordVectorModel,
    TexTokenizer,
    WordTokenizer,
)


class Predictor:
    """Predictor for most similar documents."""

    def __init__(self, data_path):
        self.eq_model = VectorModel(
            os.path.join(data_path, "nctr_se_latex2vec.model"),
            os.path.join(data_path, "q_and_a_t2v_features.npy"),
            TexTokenizer(),
        )
        self.text_model = WordVectorModel(
            os.path.join(data_path, "se_w2v.model"),
            os.path.join(data_path, "q_and_a_w2v_features.npy"),
            WordTokenizer(data_path),
        )

    def predict(self, text, code, equations, n=5):
        """Predicts the top N most similar document ids given text, code and equations (str)."""
        if text:
            return self.text_model.predict(text, n)
        elif equations:
            return self.eq_model.predict(equations, n)
        else:
            return list(range(n))

    def predict_by_id(self, id, n=5):
        return self.eq_model.predict_by_id(id, n)
