import os
import torch
import pickle
import itertools
import lstm as lc

def split_tokens(l):
    return [i.split() for i in l]

def get_data():
    X_train_dev, y_train_dev = [], []
    data_dir = '/data/movie_reviews/aclImdb/train/'
    for f in os.listdir(os.path.join(data_dir, 'neg')):
        X_train_dev.append(open(os.path.join(data_dir, 'neg', f)).read())
        y_train_dev.append(0)
    for f in os.listdir(os.path.join(data_dir, 'pos')):
        X_train_dev.append(open(os.path.join(data_dir, 'pos', f)).read())
        y_train_dev.append(1)
        
    X_train, y_train, X_dev, y_dev = [], [], [], []
    for idx, item in enumerate(X_train_dev):
        if idx % 5 == 0:
            X_dev.append(item)
            y_dev.append(y_train_dev[idx])
        else:
            X_train.append(item)
            y_train.append(y_train_dev[idx])
        
    X_test, y_test = [], []
    data_dir = '/data/movie_reviews/aclImdb/test/'
    for f in os.listdir(os.path.join(data_dir, 'neg')):
        X_test.append(open(os.path.join(data_dir, 'neg', f)).read())
        y_test.append(0)
    for f in os.listdir(os.path.join(data_dir, 'pos')):
        X_test.append(open(os.path.join(data_dir, 'pos', f)).read())
        y_test.append(1)

    return X_train_dev, y_train_dev, X_train, y_train, X_dev, y_dev, X_test, y_test

def tune_model(glove_embedding_file, save_dir):
    train_dev_tokens, train_dev_labels, train_tokens, train_labels, dev_tokens, dev_labels, test_tokens, test_labels = get_data()
    
    train_tokens = split_tokens(train_tokens)
    dev_tokens = split_tokens(dev_tokens)
    train_dev_tokens = split_tokens(train_dev_tokens)
    test_tokens = split_tokens(test_tokens)
    
    print('# train tokens: {}, # dev tokens: {}, # train dev tokens: {}, # test tokens: {}'.format(len(train_tokens), 
                                                                                                   len(dev_tokens), 
                                                                                                   len(train_dev_tokens), 
                                                                                                   len(test_tokens)))
    print('# train labels: {}, # dev labels: {}, # train dev labels: {}, # test labels: {}'.format(len(train_labels), 
                                                                                                   len(dev_labels), 
                                                                                                   len(train_dev_labels), 
                                                                                                   len(test_labels)))
    # combinations
    d = {
        'emb_dim': [300],
        'hidden_dim': [512],
        'num_layers': [1],
        'min_count': [3, 5],
        'optimizer_name': ['adam'],
        'learning_rate': [0.001, 0.0001],
        'epochs': [15]
    }
    combinations = list(itertools.product(*list(d.values())))
    print('# of combinations: {}\n'.format(len(combinations)))
    for index, combi in enumerate(combinations):
        emb_dim = combi[0]
        hidden_dim = combi[1]
        num_layers = combi[2]
        min_count = combi[3]
        optimizer_name = combi[4]
        learning_rate = combi[5]
        epochs = combi[6]
        model_prefix = '{}_{}_{}_{}_{}_{}_{}'.format(emb_dim, hidden_dim, num_layers, min_count, 
                                                     optimizer_name, learning_rate, epochs)
        model = lc.LSTMAttentionClassifier(train_dev_tokens,
                                           emb_dim,
                                           hidden_dim,
                                           num_layers,
                                           min_count,
                                           bidirectional=True,
                                           glove_embedding_file=glove_embedding_file)
        model.cuda()
        loss_record = model.fit(train_tokens, 
                                train_labels, 
                                learning_rate,
                                epochs,
                                optimizer_name,
                                dev_tokens, 
                                dev_labels, 
                                model_prefix,
                                save_dir)
        print('completed {}/{} combinations'.format(index+1, len(combinations)))
        print(combi)
        print('\n')


if __name__ == "__main__":
    __file__ = '/data/glove/glove.6B.300d.txt' 
    glove_embedding_file = os.path.abspath(__file__)
    SAVE_DIR = '/data/viv/info_sol/lstm'
    tune_model(glove_embedding_file, SAVE_DIR)
    
