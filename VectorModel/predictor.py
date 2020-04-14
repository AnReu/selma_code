import VectorModel.model


class Predictor:
    """Predictor for most similar documents."""

    def __init__(self, data_path):
        self.eq_model = VectorModel.model.VectorModel(data_path + 'nctr_se_latex2vec.model', data_path + 'questions_features.npy',
                               VectorModel.model.TexTokenizer())
        self.text_model = VectorModel.model.WordVectorModel(data_path + 'se_w2v.model', data_path + 'questions_w2v_features.npy',
                                     VectorModel.model.WordTokenizer(data_path))

    def predict(self, text, code, equations, N=5):
        """Predicts the top N most similar document ids given text, code and equations (str)."""
        if text:
            return self.text_model.predict(text, N)
        elif equations:
            return self.eq_model.predict(equations, N)
        else:
            return list(range(N))

