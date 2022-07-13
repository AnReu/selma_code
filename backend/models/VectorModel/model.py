import gensim
import numpy as np
import os
from gensim import matutils
import re
import json


class VectorModel:
    """Vector Model for nearest neighbor calculation for a given gensim word2vec model and document vectors

    Attributes:
        model_path (str): path where the gensim model file is.
        doc_vec_path (str): path where a .npy file for the document vectors is.
        tokenizer (Tokenizer): Tokenizer implementing tokenize method.

    """

    def __init__(self, model_path, doc_vec_path, tokenizer):
        self.document_vecs = np.load(doc_vec_path)
        self.model = gensim.models.Word2Vec.load(model_path)
        self.tokenizer = tokenizer

    def get_vector(self, query):
        tokenized = self.tokenizer.tokenize(query)
        return self.get_vector_from_tokenized(tokenized)

    def get_vector_from_tokenized(self, tokenized):
        mean = []
        for word in tokenized:
            if word in self.model.wv:
                mean.append(self.model.wv[word])
        return matutils.unitvec(np.array(mean).mean(axis=0)).astype(np.float32)

    def predict(self, query, n=5):
        query = self.tokenizer.tokenize(query)
        dists_query = np.dot(
            self.get_vector_from_tokenized(query), self.document_vecs.T
        )
        return np.argsort(dists_query)[-1 : -(1 + N) : -1]  # get last N vectors

    def predict_by_id(self, id, n=5):
        query_vec = self.document_vecs[id]
        dists_query = np.dot(query_vec, self.document_vecs.T)
        return np.argsort(dists_query)[-1 : -(1 + N) : -1]  # get last N vectors


class WordVectorModel(VectorModel):
    """Special vector model for tokenizing text in sentences and words."""

    def get_vector_from_tokenized(self, tokenized):
        mean = []
        for sent in tokenized:
            sent_mean = []
            for word in sent:
                if word in self.model.wv:
                    sent_mean.append(self.model.wv[word])
            if sent_mean:
                mean.append(
                    matutils.unitvec(np.array(sent_mean).mean(axis=0)).astype(
                        np.float32
                    )
                )

        return matutils.unitvec(np.array(mean).mean(axis=0)).astype(np.float32)


class TexTokenizer:
    """Tokenizer for splitting LaTeX expressions into tokens"""

    def tokenize(self, eq):
        result = []
        last_token = ""
        for char in list(eq):
            if char == "\\":
                if last_token:
                    result.append(last_token)
                last_token = "\\"
            elif last_token and last_token[0] in ["\\"]:
                if char.isalpha():
                    last_token += char
                else:
                    if last_token:
                        result.append(last_token)
                    last_token = char
            elif char.isdigit() or char == ".":  # TODO support , as decimal seperator?
                if last_token.replace(".", "").isdigit():
                    last_token += char
                else:
                    if last_token:
                        result.append(last_token)
                    last_token = char
            else:
                if last_token:
                    result.append(last_token)
                last_token = char
        result.append(last_token)
        assert "".join(result) == eq
        return result


class WordTokenizer:
    """Tokenizer for splitting a text passage into sentences and words, and normalize them."""

    def __init__(self, data_path):
        self.stopwords = json.load(open(os.path.join(data_path, "stopwords.json")))

    def split_text(self, text):
        return re.split("\. |\? |! ", text)

    def split_sent(self, sent):
        return sent.split(" ")

    def remove_tex(self, text):

        result = []
        matches = re.findall("(?:([^\$]*)\$\$?[^\$]*?\$\$?)?([^\$]*)", text)
        for start, end in matches:
            if start:
                result.append(start.strip())
            if end:
                result.append(end.strip())
        return result

    def to_ascii(self, word):
        return "".join(e if e.isalnum() else " " for e in word)

    def tokenize(self, text):
        no_tex = self.remove_tex(text)
        sents = []
        for part in no_tex:
            sents.extend(self.split_text(part))
        words = []
        for sent in sents:
            sent = sent.replace("  ", " ")
            tokenized = self.split_sent(self.to_ascii(sent))

            words.append(
                [w.lower() for w in tokenized if w and w not in self.stopwords]
            )

        return words
