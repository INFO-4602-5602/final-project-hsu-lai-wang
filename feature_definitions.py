#!/usr/bin/env python3

import numpy as np
import pandas as pd

from sklearn.base import TransformerMixin
from sklearn.feature_extraction.text import TfidfVectorizer

class BOWFeatures(TfidfVectorizer):
    def __init__(self, tokenizer=None, norm="l2",
                 use_idf=True, max_df=1.0, min_df=5,
                 lowercase=True, ngram_range=(1, 1),
                 token_pattern=r"\w+"):
        super().__init__(tokenizer=tokenizer,
                                          norm=norm,
                                          max_df=max_df,
                                          min_df=min_df,
                                          lowercase=lowercase,
                                          use_idf=use_idf,
                                          ngram_range=ngram_range,
                                          token_pattern=token_pattern)

    def fit(self, data, y=None):
        return super().fit(data, y)


    def transform(self, data, y=None):
        X = super().transform(data)
        return X

    def fit_transform(self, X, y=None):
        # make sure that the base class does not do "clever" things
        return self.fit(X, y).transform(X, y)

    def get_feature_names(self):
        feature_names = super(BOWFeatures, self).get_feature_names()
        return feature_names

class DictFeatures(TransformerMixin):
    def __init__(self, features):
        self.features = features

    def transform(self, X, *_):
        values = [self.features[v] for v in X["file_name"]]
        return np.stack(values)

    def fit(self, *_):
        return self

    def fit_transform(self, X, y=None):
        # make sure that the base class does not do "clever" things
        return self.fit(X, y).transform(X, y)
