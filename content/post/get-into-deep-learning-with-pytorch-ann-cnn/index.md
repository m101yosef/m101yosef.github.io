---
title: Get into Deep Learning ANN & CNN with pytorch
summary: PyTorch is everywhere in academic papers, economics, healthcare, Reinforcement Learning, and many more.
date: '2024-02-12'
share: false
authors:
    - admin
tags: 
    - Deep Learning
    - Neural Network
    - CNN
    - PyTorch
---

[Open in Kaggle](https://www.kaggle.com/code/mohamedyosef101/get-into-deep-learning-with-pytorch-ann-cnn)

<div><br></div>

PyTorch is everywhere in academic papers, economics, healthcare, **Reinforcement Learning** (*my area of research*), and many more. So, maybe I'm not the right person to motivate you to learn PyTorch but anyway I'll teach you!

```python
import torch
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
import seaborn as sns 

# style
sns.set()

# outcome
print(f"Last run at {dt.datetime.now()}")
```

    Last run at 2024-02-12 18:47:31.109531

```python
# check the device 
torch.cuda.is_available()
```
    True

To turn on you `cuda` or GPU, 
1. click the menu button with three vertical dots in the top right corner of the screen
2. under accelerator click GPU
and it's done!


<div><br></div>

# Concept 1. What a tensor is...

Before going to the coding, I want you to understand the concept of tensor and not just the concept and I also want to you visualize the tensors in your brain.

**Tensors:** an n-dimensional arrary of numbers (where n can be any number, a 0-dimension tensor is a scalar, a 1-dimension tensor is a vector).

> *The word tensor comes form an old latin word which means to stretch.*

<div><br></div>
<div align="center">
  <img width="180" src="https://i.ibb.co/bdJ4Xyj/3-axis-numpy.png">
  <img width="188" src="https://i.ibb.co/pxZFrM8/3-axis-front.png">
  <img width="120" src="https://i.ibb.co/rxp1Gdm/3-axis-block.png">
</div>
<div><br></div>

> **NOTE** the terms matrix and tensor are often used interchangably.

<div><br></div>

*more resources:*

- Dan Fleisch. (2011). [*What's a Tensor?*](https://youtu.be/f5liqUk0ZTw?si=eoUM7IJ8PbYyvK1I). YouTube.

- TensorFlow Core. [*Introduction to Tensors*](https://www.tensorflow.org/guide/tensor)

<div><br></div>

<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">"Types" of tensors</h2>

<div align="center"><img alt="types of tensors" src="https://hadrienj.github.io/assets/images/2.1/scalar-vector-matrix-tensor.png" width="360"></div>

```python
# scalar contains a single value, and no "axes"
scalar = torch.tensor(4)
print(f"scalar is a rank-{scalar.ndim} tensor")
```

    scalar is a rank-0 tensor

![scalar](https://i.ibb.co/vQwMrQK/scalar.png)

<div><br></div>

```python
# Vector is like a list of values and has one axis
vector = torch.tensor([2.0, 3.0, 4.0])
print(f"vector is a rank-{vector.ndim} tensor")
```

    vector is a rank-1 tensor

![vector](https://i.ibb.co/9YWmdZw/vector.png)

<div><br></div>

```python
# Matrix has two axes (also can be more)
matrix = torch.tensor([[1, 2],
                      [3, 4],
                      [5, 6]])
print(f"matrix is a rank-{matrix.ndim} tensor")
```

    matrix is a rank-2 tensor

![matrix](https://i.ibb.co/NLwfK1m/matrix.png)

<div><br></div>

```python
# Rank-3 tensor with tree axes
numbers = torch.tensor([
    [[0, 1, 3, 3, 4],
     [5, 6, 7, 8, 9]],

    [[10, 11, 12, 13, 14],
     [15, 16, 17, 18, 19]],

    [[20, 21, 22, 23, 24],
     [25, 26, 27, 28, 29]]
])

print(f"numbers is a rank-{numbers.ndim} tensor with shape {np.array(numbers.shape)}")
```

    numbers is a rank-3 tensor with shape [3 2 5]

There are many ways to visualize this tensor:
<div align="left">
  <img width="180" src="https://i.ibb.co/bdJ4Xyj/3-axis-numpy.png">
  <img width="188" src="https://i.ibb.co/pxZFrM8/3-axis-front.png">
  <img width="120" src="https://i.ibb.co/rxp1Gdm/3-axis-block.png">
</div>

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;"> Random, Zeros, Ones, range, and like Tensors</h2>

```python
# create a random tensor of size (2, 3)
rand_MATRIX = torch.rand(size=(2,3))
rand_MATRIX
```

    tensor([[0.4360, 0.6261, 0.9401],
            [0.1269, 0.9599, 0.2970]])

<div><br></div>

```python
# create a tensor of all zeros
zeros_TENSOR = torch.zeros(size=(2, 1, 3))
zeros_TENSOR
```

    tensor([[[0., 0., 0.]],
    
            [[0., 0., 0.]]])

<div><br></div>

```python
# create a torch of all ones
ones_M = torch.ones(size=(2, 2))
ones_M
```

    tensor([[1., 1.],
            [1., 1.]])

<div><br></div>

```python
# create a range of numbers from 1996 to 2030 with tensors
years = torch.arange(start=1996, step=1, end=2031)
years
```

    tensor([1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
            2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
            2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030])

<div><br></div>

```python
# a tensor like "years" but with all values of 1
years_prob = torch.ones_like(input=years)
years_prob
```

    tensor([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])


<div><br></div>

# Concep 2. Neural Network

I think you know what a neural network is.. But if you don't, give a look to the following playlist $\downarrow$
- Grant Sanderson. (2017). [*Neural Networks, Deep Learning*](https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&si=ieGLDzRU2Ln9L0RO). YouTube.

<div><br></div>

### """
## The best way to learn is by doing, so let's get it done!
### """

<div><br></div>

<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">2.1_ Import Libraries</h2>

```python
import torch # I know I've already import it before 
from torch import nn
from torch.autograd import Variable as var
from torch.utils.data import DataLoader as dl
import pandas as pd
from sklearn.model_selection import train_test_split as tts

print("It's done!")
```

    It's done!

From now on, I want you to get into the habbit of reading documentation and know that **the more you read the more you grow**. 

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;"><a class="anchor"  id="2-2_data-preperation">2.2_ Data Preparation</a></h2>

<div align="center">
    <img alt="sample of the data"
         src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*Ft2rLuO82eItlvJn5HOi9A.png"
         width="560">
    <div>
        <span>sample of the dataset</span>
    </div>
</div>

```python
# load data
train = pd.read_csv("/kaggle/input/digit-recognizer/train.csv", dtype = np.float32)

# split data into features "X" (image pixels) and labels (0 to 9)
np_targets = train.label.values
np_features = train.loc[:, train.columns != "label"]

np_features = np_features.values/255 # Normalize features

train.head(2)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>label</th>
      <th>pixel0</th>
      <th>pixel1</th>
      <th>pixel2</th>
      <th>pixel3</th>
      <th>pixel4</th>
      <th>pixel5</th>
      <th>pixel6</th>
      <th>pixel7</th>
      <th>pixel8</th>
      <th>...</th>
      <th>pixel774</th>
      <th>pixel775</th>
      <th>pixel776</th>
      <th>pixel777</th>
      <th>pixel778</th>
      <th>pixel779</th>
      <th>pixel780</th>
      <th>pixel781</th>
      <th>pixel782</th>
      <th>pixel783</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 785 columns</p>
</div>

Don't forget to make the type of the train data as float, `dtype = np.float32`, because if you forget, it will break your model.

<div><br></div>

```python
# split 80% for train and 20% for test
X_train, X_test, y_train, y_test = tts(np_features,
                                      np_targets,
                                      test_size=0.2,
                                      random_state=42)
```

The data now stored as a numpy array but you need to work with PyTorch therefore you need to **turn data into tensors**.

<div><br></div>

```python
#Put data in tensors
Xtrain = torch.from_numpy(X_train)
Xtest = torch.from_numpy(X_test)

ytrain = torch.from_numpy(y_train).type(torch.LongTensor)
ytest = torch.from_numpy(y_test).type(torch.LongTensor)

# PyTorch train and test datasets
train = torch.utils.data.TensorDataset(Xtrain, ytrain)
test = torch.utils.data.TensorDataset(Xtest, ytest)
```

```python
# Data Loader DL
train_loader = dl(train, 
                 batch_size=100,
                 shuffle=False)

test_loader = dl(test,
                batch_size=100,
                shuffle=False)
```

If you don't understand what a DataLoader is, check this: 
- Tongzhou Wang. (Nov 2019). [*Dataloader Design for PyTorch*](https://youtu.be/sCsPzVumtR8?si=3M7Z3ktjLt37F-Kw). PyTorch core talks.

```python
# visualize one image in the data
plt.imshow(np_features[101].reshape(28,28), cmap='gray')
plt.axis("off")
plt.title(str(np_targets[101]))
plt.show()
```

    
![png](output_38_0.png)
    
<div><br></div>

<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">2.3_ Build NN Model</h2>

As you saw in the [videos](https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab&si=ieGLDzRU2Ln9L0RO), the basic neural network contains of input layer, hidden layer/s, and output layer. So, our model will have **input layer, 2 hidden layers and output layer**. 

<div align="center">
    <img src="https://i.imgur.com/ywMFtDz.png" width="560">
</div>

<div><br></div>

```python
class ANNModel(nn.Module): 
    
    ### Define Network Architecture ###
    def __init__(self, input_dim, hidden_dim, output_dim):
        
        super(ANNModel, self).__init__()
        # super function inherits from nn.Module 
        # and can access everything in it.
        
        # Input Layer 
        self.layer1 = nn.Linear(input_dim, hidden_dim)
        self.act1 = nn.ReLU() # Activation function
        
        # 2 hidden layers 
        self.layer2 = nn.Linear(hidden_dim, hidden_dim)
        self.act2 = nn.Tanh()
        
        self.layer3 = nn.Linear(hidden_dim, hidden_dim)
        self.act3 = nn.ELU() 
        
        # Output Layer
        self.layer4 = nn.Linear(hidden_dim, output_dim)
        
    ### Define Forward Pass ###
    def forward(self, x): 
        
        # layer 1
        out = self.layer1(x)
        out = self.act1(out)
        
        # layer 2
        out = self.layer2(out)
        out = self.act2(out)
        # layer 3
        out = self.layer3(out)
        out = self.act3(out)
        # layer 4
        out = self.layer4(out)
        
        return out
    
print("NN Model has been defined!")
```

    NN Model has been defined!

<div><br></div>

```python
# set the parameters
input_dim = 28*28 # the size of the image
hidden_dim = 150 # open for experiment but 150 as a start
output_dim = 10 # number of classes (from 0 to 9)

batch_size = 100
n_iterations = 10000
num_epochs = n_iterations / (len(X_train) / batch_size)
num_epochs = int(num_epochs)

# Create the model
model = ANNModel(input_dim, hidden_dim, output_dim)
```

More about paramerters $\downarrow$
* Misra Turp. (oct 2022). [All Hyperparameters of a Neural Network Explained
](https://youtu.be/r2TvNmAxiCU?si=uHO35u4X9jUlnvUi). YouTube.

<div><br></div>

```python
### Set loss, optimizer, and Learning rate ###

# loss function -> CrossEnropy (check pytorch docs)
error = nn.CrossEntropyLoss() 

# Learning rate 
learning_rate = 0.02 #(just as a start)

# optimizer -> Stochastic gradient decent (SGD)
optim = torch.optim.SGD(model.parameters(),
                       lr= learning_rate)
```

Take a look at: 
* Misra Turp. (oct 2022). [Which Loss Function, Optimizer and LR to Choose for Neural Networks](https://youtu.be/KI5gOnlQeN8?si=KTc_d8USTuGXtuu-). YouTube.

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">2.4_ Model Training</h2>

In the previous step, we have defined a model with input layer, 2 hidden layers, and output layer. The goal of this step is to train the model and to do so you will use the basics; [forward pass](https://youtu.be/rhYYBT6OrOw?si=e70Z45-_6LimT2g_) then come back again with a [backward propagation](https://youtu.be/nH9bWLJI_7A?si=k0m6Dt5ynbqkrgwM). 

```python
### Model training loop ###

# prepare for the loop 
count = 0
model_loss = []
iterations = []
model_accuracy = []

# start the loop 
for epoch in range(num_epochs): 
    
    for i, (images, labels) in enumerate(train_loader): 
        
        train = var(images.view(-1, 28*28))
        labels = var(labels) 
        
        # clear the gradients of the optimizer
        optim.zero_grad() 
        
        # forward propagation
        outputs = model(train)
        loss = error(outputs, labels)
        
        # backward propagation and update parameters
        loss.backward() 
        optim.step()
        
        count += 1
        
        if count % 50 == 0: 
            
            correct = 0 # correct predictions
            total = 0 # total number of labels
            
            # predict test dataset
            for images, labels in test_loader: 
                
                test = var(images.view(-1, 28*28))
                
                # forward
                outputs = model(test) 
                
                # get the maximum value of predictions
                predicted = torch.max(outputs.data, 1)[1]
                
                # total number of labels 
                total += len(labels) 
                
                # total correct predictions
                correct += (predicted == labels).sum()
                
            accuracy = 100 * correct / float(total) 
            
            # store for the evaluation
            model_loss.append(loss.data)
            iterations.append(count) 
            model_accuracy.append(accuracy)
            
            if count % 500 == 0:
                print(f"Iteration: {count} Loss: {loss.data:.2f} | Accuracy: {accuracy:.2f}")
```

    Iteration: 500 Loss: 0.81 | Accuracy: 79.15
    Iteration: 1000 Loss: 0.45 | Accuracy: 87.95
    Iteration: 1500 Loss: 0.22 | Accuracy: 89.76
    Iteration: 2000 Loss: 0.28 | Accuracy: 90.61
    Iteration: 2500 Loss: 0.31 | Accuracy: 92.20
    Iteration: 3000 Loss: 0.13 | Accuracy: 92.81
    Iteration: 3500 Loss: 0.23 | Accuracy: 93.49
    Iteration: 4000 Loss: 0.06 | Accuracy: 94.18
    Iteration: 4500 Loss: 0.30 | Accuracy: 94.49
    Iteration: 5000 Loss: 0.10 | Accuracy: 94.75
    Iteration: 5500 Loss: 0.20 | Accuracy: 94.95
    Iteration: 6000 Loss: 0.19 | Accuracy: 95.12
    Iteration: 6500 Loss: 0.09 | Accuracy: 95.35
    Iteration: 7000 Loss: 0.10 | Accuracy: 95.82
    Iteration: 7500 Loss: 0.11 | Accuracy: 95.73
    Iteration: 8000 Loss: 0.20 | Accuracy: 95.76
    Iteration: 8500 Loss: 0.06 | Accuracy: 95.89
    Iteration: 9000 Loss: 0.05 | Accuracy: 96.17
    Iteration: 9500 Loss: 0.02 | Accuracy: 96.10

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">2.5_ Evaluation</h2>

There are many ways to evaluate the model and many more [evaluation metrics](https://youtu.be/NE1iCyqUMRI?si=dH_6kLafDuZ_rY6g) but let's make it simple for you and me by using the `Loss` and `Accuracy`.

```python
# visualize loss
plt.plot(iterations, model_loss, color="red")
plt.xlabel("Number of iterations")
plt.ylabel("Loss")
plt.title("Neural Network Model Loss vs Iterations")
plt.show()

# visualize accuracy
plt.plot(iterations, model_accuracy, color="green")
plt.xlabel("Number of iterations")
plt.ylabel("Accuracy")
plt.title("Model Accuracy vs Iterations")
plt.show()
```

    
![png](output_49_0.png)
    

    
![png](output_49_1.png)
    

<div><br></div>

# Concept 3. Convolutional Neural Network

As you may know, [CNN](https://youtu.be/3mTUAQIHO2U?si=AhwVDERhPZWMMPoo) is a type of Neural Network that is used for images classification and object detection.

<div align="center">
    <img src="https://i.ibb.co/8rcnyFN/gec2.jpg">
</div>

<div><br></div>

#### **Bounce**
If you want to understand what the word "convolution" mean, watch: 
- Grant Sanderson. (18 Nov 2022). [*But what is a convolution*](https://youtu.be/KuXjwB4LzSA?si=miIHN0ViLuhtdrWi). YouTube.

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">3.1_ Import Libraries</h2>

```python
import torch
from torch import nn
from torch.autograd import Variable as var
```

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">3.2_ Data preperation</h2>

We'll do the same steps we did in ANN model data preperation. If you haven't done the steps go and check -> [2.2_ Data Preperation](#2-2_data-preperation).


<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">3.3_ Build CNN Model</h2>

Learn more about convolutional neural network:
* Misra Turp. (2022). [The basics of CNN](https://youtu.be/3mTUAQIHO2U?si=rzku9Tz8mUU65Nlf) & [CNN follow along calculation](https://youtu.be/4UjK-w3Z8So?si=lzZG5C8_eS6PckM8). YouTube.

```python
class CNNModel(nn.Module):
    def __init__(self):
        super(CNNModel, self).__init__()
        # super function inherits from nn.Module 
        # and can access everything in it. 
        # (I said this before I know)
        
        # CNN 1
        self.cnn1 = nn.Conv2d(in_channels=1,
                             out_channels=16,
                             kernel_size=5,
                             stride=1, padding=0)
        self.act1 = nn.ReLU() # Activation function
        
        # Max Pool 1
        self.maxpool1 = nn.MaxPool2d(kernel_size=2)
        
        # ______ 
        
        # CNN 2
        self.cnn2 = nn.Conv2d(in_channels=16, 
                             out_channels=32,
                             kernel_size=5, 
                             stride=1, padding =0)
        
        self.act2 = nn.ReLU() 
        
        # Max Pool 2
        self.maxpool2 = nn.MaxPool2d(kernel_size=2)
        
        # ________
        
        # Fully connected 1
        self.fc1 = nn.Linear(32 * 4 * 4, 10)
        
        
    ### Forward pass ###
    def forward(self, x):
        out = self.cnn1(x)
        out = self.act1(out)
        out = self.maxpool1(out)
        out = self.cnn2(out)
        out = self.act2(out)
        out = self.maxpool2(out)
        
        # flatten
        out = out.view(out.size(0), -1)
        
        out = self.fc1(out)
        return out
```

```python
batch_size = 100
n_iterations = 2500
num_epochs = n_iterations / (len(X_train) / batch_size)
num_epochs = int(num_epochs)

# Create the model
model = CNNModel()
```

More about paramerters $\downarrow$
* Misra Turp. (oct 2022). [All Hyperparameters of a Neural Network Explained
](https://youtu.be/r2TvNmAxiCU?si=uHO35u4X9jUlnvUi). YouTube.

<div><br></div>

```python
### Set loss, optimizer, and Learning rate ###

# loss function -> CrossEnropy (check pytorch docs)
error = nn.CrossEntropyLoss() 

# Learning rate 
learning_rate = 0.1

# optimizer -> Stochastic gradient decent (SGD)
optim = torch.optim.SGD(model.parameters(),
                       lr= learning_rate)
```

Take a look at: 
* Misra Turp. (oct 2022). [Which Loss Function, Optimizer and LR to Choose for Neural Networks](https://youtu.be/KI5gOnlQeN8?si=KTc_d8USTuGXtuu-). YouTube.

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">3.4_ Model Training</h2>

<div align="center">
    <img src="https://i.ibb.co/8rcnyFN/gec2.jpg">
    <span>Look at this image a gain and you'll see that we've created the same exact model. </span>
</div>

```python
### CNN model training loop ###

# initiation
count = 0
loss_list = []
iterations = []
accuracy_list = [] 

# start the loop 
for epoch in range(num_epochs): 
    for i, (images, labels) in enumerate(train_loader):
        
        # use autograd variable 
        train = var(images.view(100, 1, 28, 28))
        labels = var(labels) 
        
        # clear gradients
        optim.zero_grad() 
        
        # Forward propagation
        outputs = model(train)
        
        # softmax and entropy loss 
        loss = error(outputs, labels)
        
        # Backward propagation 
        loss.backward()
        optim.step()
        
        count += 1
        
        if count % 50 == 0:
            correct = 0 # correct predictions
            total = 0  # total number of labels
            
            for images, labels in test_loader:
                test = var(images.view(100, 1, 28, 28))
                
                # forward prop.
                outputs = model(test) 
                
                # get predictions 
                predicted = torch.max(outputs.data, 1)[1]
                
                # update parameters
                correct += (predicted == labels).sum()
                total += len(labels)
                
            accuracy = 100 * correct /float(total) 

            # store for evaluation
            loss_list.append(loss.data)
            iterations.append(count)
            accuracy_list.append(accuracy)
        
        if count % 500 == 0:
            print(f"Iteration: {count} Loss: {loss.data:.2f} Accuracy: {accuracy:.2f}%")
```

    Iteration: 500 Loss: 0.10 Accuracy: 96.76%
    Iteration: 1000 Loss: 0.05 Accuracy: 97.52%
    Iteration: 1500 Loss: 0.03 Accuracy: 97.80%
    Iteration: 2000 Loss: 0.01 Accuracy: 98.24%

<div><br></div>
<h2 style="background:#00373E; color: #E3EEFC; border-radius: 4px; padding: 8px 32px;">3.5_ Model Evaluation</h2>

Again... There are many ways to evaluate the model and many more [evaluation metrics](https://youtu.be/NE1iCyqUMRI?si=dH_6kLafDuZ_rY6g) but let's make it simple for you and me by using the `Loss` and `Accuracy`.

```python
# visualization loss 
plt.plot(iterations, loss_list, color="red")
plt.xlabel("Number of iterations")
plt.ylabel("Loss")
plt.title("CNN Model: Loss over iterations")
plt.show()

# visualization accuracy 
plt.plot(iterations, accuracy_list, color = "green")
plt.xlabel("Number of iterations")
plt.ylabel("Accuracy")
plt.title("CNN Model: Accuracy over iterations")
plt.show()
```

    
![png](output_65_0.png)
    

    
![png](output_65_1.png)
    

<div><br></div>

# References
- DATAI. (Apr 2020). [*PyTorch tutorial for deep learning lovers*](https://www.kaggle.com/code/kanncaa1/pytorch-tutorial-for-deep-learning-lovers). Kaggle.
- Andrada. (May 2020). [*How I tought myself deep learning*](https://www.kaggle.com/code/andradaolteanu/how-i-taught-myself-deep-learning-vanilla-nns). Kaggle.
- Misra Turp. (2022). [*50 Days of Deep Learning*](https://youtube.com/playlist?list=PLM8lYG2MzHmQn55ii0duXdO9QSoDF5myF&si=s1pe9cRtFjKCPqR5). YouTube.
- Mohamed Yosef. (Dec 2023). [Build you first NN model with TensorFlow](https://www.kaggle.com/code/mohamedyosef101/build-your-first-neural-network). Kaggle. 
