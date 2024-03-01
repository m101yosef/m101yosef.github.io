---
title: '**O**bject **O**riented **P**rogramming in Python'
date: '2024-03-01'
---


<img alt="OOP with Python" src="https://github.com/mohamedyosef101/101_learning_area/assets/118842452/279a319d-5beb-4b37-b593-95ba36b59753">

**4 Principles of OOP**:
1. Inheritance
2. Polymorphism
3. Encapsulation
4. Abstraction

# Create **Classes**

## Why we need classes?
In Python, we use lists, strings, integers, other data types to do simple and fast tasks like...

```python
# storing the data of some developers using a list
# the list includes position, name, age, level, and salary.

dev1 = ["ML Developer", "Ali", 27, "senior", 8000]
dev2 = ["Java Developer", "Amr", 19, "Junior", 4500]
```

What will happen if the name is missing in `dev1` or `dev2`?

What if you want "ML Developers" to do one thing and "Java Developers" do another?

In this case, we need a more advanced data structure that can handle these things for us. And this is the reason why we need classes.

<div><br></div>

## What is a class? How to create one...
In Python, a class is a **blueprint** or **template** used to create objects. It defines the **attributes** (*data*) and **methods** (*functions*) that objects of that class will have.

```python
class Dev:
  """
  A simple class representing a developer
  """

  # Class attributes (shared by all instances)
  category = "tech"

  def __init__(self, position, name, age, level, salary):
    """
    Initializer method for the Dev class

    Attributes or Properties:
      Position (str): the job title of the developer
      Name (str): the first name of the developer
      Age (int): the age of the developers in years
      Level (str): the experience level (e.g., senior, junior, ...)
      Salary (int): the monthly salary for the dev.
    """
    # Instance attributes
    #(unique to each developer -> that's why we use 'self')
    self.position = position
    self.name = name
    self.age = age
    self.level = level
    self.salary = salary

  # Create a class method
  def describe(self):
    """
    Prints a description of the developer.
    """
    print(f"{self.name} is a {self.age} years old" +
          f"{self.level} {self.position} and" +
          f"his salary is {self.salary}/month")

### Create an object (instance) of the Dev class ###
dev1 = Dev("ML Developer", "Ali", 27, "senior", 8000)

# call the object method
dev1.describe()
```

    Ali is a 27 years oldsenior ML Developer andhis salary is 8000/month

<div><br></div>

**Explaination**:
* **`__init__`**: is a special method we use to initialize the attributes or properties of our object. (*for more, take a look at [this video](https://youtu.be/mYKGYr0xaXw?si=6DcrikEwa4Vy0X5U) by 2MinutesPy on YouTube*)
* **Objects**: are instances of the `Dev` class, represents individual developers like `dev1`.
* **Properties/Attributes**:
  - Class attributes: shared by all instances (e.g., `category`)
  - Instance attributes: unique to each object (e.g., `name`, `age`, ...)

* **Methods**: functions defined within the class (e.g., `describe`)

<div><br></div>

# **Special Functions** in Class

Also called **special methods** or **dunder methods**, *because these methods have a double underscore prefix and suffix*.

**Common examples**:
1. `__init__`: initialize the attributes of our object. (*you've already seen it in the code above*)

2. `__str__`: defines how the object is represented as a string. (*It can replace `describe()` function in the above code*)

```python
# ============= example of using __str__ ==========
class Dev:
  category = "tech"
  def __init__(self, position, name, age, level, salary):
    self.position = position
    self.name = name
    self.age = age
    self.level = level
    self.salary = salary

  # Create a class method
  def __str__(self):
    """
    Prints a description of the developer.
    """
    return f"{self.name} is a {self.age} years old {self.level} {self.position} and his salary is {self.salary}/month"

### Create an object (instance) of the Dev class ###
dev1 = Dev("ML Developer", "Ali", 27, "senior", 8000)

# Print the dev object using str() or directly
print(str(dev1))
print(dev1)
```

    Ali is a 27 years old senior ML Developer and his salary is 8000/month
    Ali is a 27 years old senior ML Developer and his salary is 8000/month

Also, there are many more special functions like:
- `__repr__`: defines the official string representation and is often for dubugging purpose.
- `__eq__`: works as equal `=`
- `__add__`: works as addition `+`,

and so on...

# 1. **In**heritance

Creating new classes (child classes) that inhirts properties and behaviors from other classes (parent classes).

For our example, let's say that within our developers, we have some ML developers and frontend developer, etc. So, what I'm saying is we have a big container `Dev` and inside this big container "parent", I want to create a small one for `MLDev` "child".

```python
# big container (parent)
class Dev:
  def __init__(self, name, age):
    self.name = name
    self.age = age
  def __str__(self):
    return f"{self.name} is a {self.age} years old"

# the child
class MLDev(Dev):
  def __init__(self, name, age, framework):
    # get the attributes form the parent class
    super().__init__(name, age)
    """
    The new thing here is:
      Framework (str): to be TensorFlow or PyTorch and so on.
    """
    self.framework = framework

  # override __str__ / redefine the method
  def __str__(self):
    return f"{self.name} is a {self.age} years old and he uses {self.framework}"

# calling the MLDev
ml_developer = MLDev("Mohamed", 22, "PyTorch")
print(ml_developer)
```

    Mohamed is a 22 years old and he uses PyTorch

**Explaination**:
- **`super()`**: is to get the properties/attributes of the parent class `Dev` so we can use them in the child class `MLDev`.
- **Extend** the functionality by adding `framework` attribute to `MLDev` class.
- **Override** the basic `__str__` function to include the framework.

<div><br></div>

# 2. **Poly**morphism
A Greek word means "many shapes" and we use it when we want the objects of different classes to response differently to the same method call.

To do that, we will first create a list of developers (a mix between general developer from the parent class `Dev` and machine learning developers from the child class `MLDev`) then print them and see the differences...

```python
devs = [Dev("Ali", 28), MLDev("Mohamed", 22, "PyTorch")]

for dev in devs:
  print(str(dev))
```

    Ali is a 28 years old
    Mohamed is a 22 years old and he uses PyTorch

**Explaination**:

We can now see that we used the same method `__str__` but got two different responds; one with only name & age while the other with name, age, and the framework "PyTorch".

# 3. **Encapsulation**
Aims to protect and bundle data and the methods that operate on the data within a single class.

> **NOTE**
>
>Python doesn't have strict access modifiers like some other OOP languages (e.g., private, public). So, we use underscore (`_`) before a variable name to indicate that it is "private".

```python
class Dev:
  def __init__(self, name, salary):
    self.name = name
    # "Private" attribute
    # (not strictly enforced, but convention for internal use)
    self._salary = salary

  def extra_hours(self, hours):
    amount = hours * 100
    self._salary += amount
    print(f"{amount}$ added to the salary this month")

# call it
developer = Dev("Mohamed", 3000)
developer.extra_hours(3)
```

    300$ added to the salary

# 4. Abstraction
Focusing on hidding the internal implementation details of a class and exposing only its essential functionality to the user.

```python
class DataReader:
  """
  This abstract class provides an interface for reading data from different sources.
  """

  def __init__(self, source):
      self.source = source

  def read_data(self):
      """
      This method is abstract and must be implemented in subclasses to handle specific data sources.
      """
      raise NotImplementedError("Subclasses must implement read_data")

class TextFileReader(DataReader):
  """
  A subclass of DataReader that reads data from a text file.
  """

  def read_data(self):
      """
      Overrides the abstract method to read data from a text file.
      """
      try:
          with open(self.source, "r") as f:
              data = f.read()
          return data
      except FileNotFoundError:
          print(f"Error: File not found - {self.source}")
          return None

class CSVReader(DataReader):
  """
  A subclass of DataReader that reads data from a CSV file.
  """

  def read_data(self):
      """
      Overrides the abstract method to read data from a CSV file using a library like pandas.
      """
      import pandas as pd

      try:
          data = pd.read_csv(self.source)
          return data
      except FileNotFoundError:
          print(f"Error: File not found - {self.source}")
          return None

# Attempting to create a DataReader object directly results in an error (abstract class)
# reader = DataReader("data.txt")

# Create TextFileReader and CSVReader objects to access specific functionalities
text_reader = TextFileReader("data.txt")
text_data = text_reader.read_data()

csv_reader = CSVReader("data.csv")
csv_data = csv_reader.read_data()

# Access data if successfully read
if text_data:
  print("Text data:", text_data)
if csv_data is not None:  # Checking for both data and potential errors
  print("CSV data:", csv_data)

### This cell generated by Gemini (Google AI), not by me. So be aware with it.
```

    Error: File not found - data.txt
    Error: File not found - data.csv

# References
- Patrick Loeber. [*OOP in Python: Beginner crash course*](https://youtu.be/-pEs-Bss8Wc?si=lK3hEtixgU60S2O4). YouTube.
- My chat with Gemini. https://g.co/gemini/share/d57ea3486abb.
