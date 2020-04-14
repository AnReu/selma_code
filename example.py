import VectorModel.predictor
import json

data_path = '/home/anja/projects/equation_emb/data/stackexchange/physics/'
documents = json.load(open(data_path + '300_physics_questions.json'))

predictor = VectorModel.predictor.Predictor(data_path)

text = 'Gamma rays'
code = ''
equation = ''
results = predictor.predict(text, code, equation)

for result in results:
    print('#############')
    print(documents[result]['text'])