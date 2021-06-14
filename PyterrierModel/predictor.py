import PyterrierModel.textmodel

class Predictor:
    """Predictor for most similar documents."""

    def __init__(self, data_path):
        print("here i am")
        data_path = "/home/wilhelm/Uni/retrievalsystem/retrievalsystem_model/retrievalsystem/PyterrierModel/wt2g_index/data.properties"
        self.text_model = PyterrierModel.textmodel.TF_IDFModel(data_path)

    def predict(self, text, code, equations, N=5):
        """Predicts the top N most similar document ids given text, code and equations (str)."""
        print("predictor is used")
        print(text)
        if text:
            print(self.text_model.predict(text, N))
            return self.text_model.predict(text, N)
        elif equations:
            return self.eq_model.predict(equations, N)
        else:
            return list(range(N))

    '''def predict_by_id(self, id, N=5):
        return self.eq_model.predict_by_id(id, N)'''