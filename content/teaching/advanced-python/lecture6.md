---
title: "6. OOP Introduction"
date: 2025-08-25
weight: 6
type: docs
tags: 
- Python
---

When I first began programming in Python, I was doing messy code (most beginner data scientist are famous for their messy code). Then, I learned [functional programming](https://m101yosef.github.io/teaching/advanced-python/lecture3); the Python main point of using functions is to avoid repetition as mention in [PEP 8](https://peps.python.org/pep-0008/) performance tips (DRY) which is: don't repeat yourself. While the true idea behind function programming is to use pure functions like `map`, `filter`, or `reduce` to transform your data without side effects&mdash;this means that the function only effects its input not other parts of the code. However, when I start using PyTorch for building custom neural networks, I found that combining FP techniques with object-oriented programming (OOP) often yields cleaner code. Python is a multi-paradigm language, and mixing styles is common practice. In fact, for a lot of problems, you will often solve some parts of the problem in a functional way and other parts with objects ([Nelson, 2024](https://www.oreilly.com/library/view/software-engineering-for/9781098136192/)). So, Keeping both tools in my toolbox made my code cleaner, more flexible, and readable.

From a historical perspective, OOP itself was born out of the need to model complex systems in code. In the 1960s, languages like Simula (1961 - 1967) introduced essential OOP ideas such as classes, inheritance, and dynamic binding. These allowed programmers to group data and behaviour into "objects" instead of only writing procedural steps. Over decades, many programming languages uses OOP as their main style like Java and C++. Today, many Python tools, library, even Python itself embraces OOP, providing classes, inheritance, and polymorphism similar to legendary programming languages. 

## Defining classes
A class itself defines an object, and you can think of it as a template for building various objects. An individual object is an instance of that class, and each object is an individual "thing" ([Nelson, 2024](https://www.oreilly.com/library/view/software-engineering-for/9781098136192/)). 

```python
class Car:
    """A simple class representing a car."""

    # attributes = adjectives or properties
    def __init__(self, color, speed):
        self.color = color
        self.speed = speed
    
    # methods = actions
    def start_engine(self): 
        pass
    
    def stop_engine(self): 
        pass
```

When I write `class Car:`, Python bundles data and functions together into one unit. As the [official docs](https://docs.python.org/3/tutorial/classes.html) explain, "Classes provide a means of bundling data and functionality together". In the code snippet above, `Car` is a new type, and each instance will have a `color` and `speed` attribute (set by `__init__`). 

### Naming convention
According to [PEP 8](https://peps.python.org/pep-0008/), class names should use the `CamelCase` convention. That means I write `class Car:` or `class BankAccount`, not `class car` or `class bank_account`. By contrast, methods and functions should be `snake_case`. As we said in [lecture 1](https://m101yosef.github.io/teaching/advanced-python/lecture1), following these naming rules helps coders (like you and me) read the code more easily. 

### The initialisation constructor 
Every class can define a special method named `__init__()`, which Python calls automatically when creating a new instance. This method, as the name suggested, initialises the object's initial state. In my `Car` example, `__init__` takes color and speed as parameters and assigns them to the instance. So, consider `__init__` as your chance to set up any attributes the object needs. 

```python
from typing import Optional

class Book: 
    def __init__(
        self, 
        title: str, 
        author: str, 
        year: int, 
        pages: Optional[int] = None
        ): 
        """
        Initialises the Book object with its basic properties. 

        Args: 
            title (str): the name of the book.
            author (str): the name of the book's author.
            year (int): the year the book published.
            pages (int, optional): the number of pages in the book.
        """
        self.title = title
        self.author = author
        self.year = year
        self.pages = pages

# Create a new instance of Book
book = Book(
    title="The Spider", 
    author="Mustafa Mahmoud", 
    year=1995
    pages=50
    )
print(book.title, book.year)
```

When I write `book = Book(...)`, Python creates a new `Book` object and automatically calls `__init__`, setting all the properties that we have (title, author, year, pages). The `self` parameter inside `__init__` refers to the instance being created (more on `self` below). After construction, every `Book` object has its own title, author, year, pages attributes attached. 

## Building a simple array class
To tie everything together, I often build toy examples. For instance, I might write a simple class that mimics a tiny subset of a NumPy-like array. As you know every class has two main components: attributes (adjectives/properties) and methods (actions). So for `OurArray` we will use two attributes; `data` to store inputs as a list and shape to return the size of the array. Also, two methods; mean and sum. But first list see how these attributes and methods looks like in the real NumPy array. 

```python
import numpy as np 
data = [1, 2, 3, 4]

# Creating an array instance
numpy_array = np.array(data)

# Attributes
print(
    f"Attributes",
    f"Data: {data}", 
    f"Shape: {numpy_array.shape}", 
    sep="\n"
)

# Methods
np_mean = numpy_array.mean()
np_sum = numpy_array.sum()

print(
    f"\nMethods",
    f"The mean is: {np_mean}",
    f"The sum is: {np_sum}",
    sep="\n"
)
```
```
Attributes
Data: [1, 2, 3, 4]
Shape: (4,)

Methods
The mean is: 2.5
The sum is: 10
```

Since we have seen how the attributes and methods we chose work in the NumPy world, let's try to build something like them within our world under a class named `OurArray`. 
```python
from typing import List

class OurArray:
    """
    A simple array class with methods for sum and mean.
    """
    def __init__(self, data: List[int]): 
        """Initialises the array with a list of numbers."""
        self.data = data 
        self.shape = len(self.data)
    
    def mean(self): 
        """Calculates the mean (average) of all elements in the array."""
        return sum(self.data) / len(self.data)
    
    def sum(self): 
        """Calculates the sum of all elements in the array."""
        total = 0
        for item in self.data: 
            total += item 
        return total 

# --- Example Usage ---
# Create an instance of OurArray
our_list_array = OurArray([1, 2, 3, 4])

# Attributes
print(
    f"Attributes",
    f"Data: {our_list_array.data}", 
    f"Shape: {our_list_array.shape}", 
    sep="\n"
)

# Methods
our_mean = our_list_array.mean()
our_sum = our_list_array.sum()

print(
    f"\nMethods",
    f"The mean is: {our_mean}",
    f"The sum is: {our_sum}",
    sep="\n"
)
```
```
Attributes
Data: [1, 2, 3, 4]
Shape: 4

Methods
The mean is: 2.5
The sum is: 10
```
Despite creating a successful array, there are still a lot of things needed like error and exception handling. But, I will leave that to you to play with.

## Final note on OOP
From my small experience, OOP is valuable because it promotes modular, reusable, and maintainable code. OOP almost checks all performance books, it is optimised for speed, memory, and most importantly scalability. Whenever you need to extend the functionality of your program, I can often add a new class or method without rewriting everything. 


## Exercises
1. Define a class `Rectangle` that takes width and height in its `__init__`, and stores them as attributes. Then add a method `area()` that returns the rectangle’s area (width × height). 
2. Pick a real-world object (like a bank account, school, or playlist) and try designing a Python class for it. Define relevant attributes (the object's "adjectives") and one or two methods (the object's "actions"). Instantiate the class and call its methods to see how the attributes and methods work together. 


## References

[<span>1</span>] Guido van Rossum, Barry Warsaw, & Alyssa Coghlan. (2001). PEP 8 - Style Guide for Python Code. https://peps.python.org/pep-0008/ <br>
[<span>2</span>] Catherine Nelson. (2024). Software Engineering for Data Scientists. O’Reilly Media, Inc. https://www.oreilly.com/library/view/software-engineering-for/9781098136192/ <br>