import backend.models.PyterrierModel.textmodel


class Predictor:
    """Predictor for most similar documents."""

    def __init__(self, data_path):
        print("initialisation of the PyTerrierModel.predictor")
        # path to the data.properties of the used index
        data_path = "/Users/gui/Development/repos/retrievalsystem/backend/models/PyterrierModel/wt2g_index/data" \
                    ".properties"
        self.text_model = backend.models.PyterrierModel.textmodel.TF_IDFModel(data_path)

    def predict(self, text, code, equations, n=5):
        """Predicts the top N most similar document ids given text, code and equations (str)."""
        print("predictor is used and this is the query:")
        print(text)
        if text:
            print("This is the return of the predictor:")
            print(self.text_model.predict(text, n))
            return self.text_model.predict(text, n)
        elif equations:
            return self.eq_model.predict(equations, n)
        else:
            return list(range(n))

    '''def predict_by_id(self, id, N=5):
        return self.eq_model.predict_by_id(id, N)'''