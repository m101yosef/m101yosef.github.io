---
title: "7. OOP Introduction"
date: 2025-08-27
weight: 7
type: docs
tags: 
- Python
---

When I first began programming in Python, I was doing messy code (most beginner data scientist are famous for their messy code). Then, I learned [functional programming](https://m101yosef.github.io/teaching/modular-python/lecture4); the Python main point of using functions is to avoid repetition as mention in [PEP 8](https://peps.python.org/pep-0008/) performance tips (DRY) which is: don't repeat yourself. While the true idea behind function programming is to use pure functions like `map`, `filter`, or `reduce` to transform your data without side effects&mdash;this means that the function only effects its input not other parts of the code. 

However, when I start using PyTorch for building custom neural networks, I found that combining FP techniques with object-oriented programming (OOP) often yields cleaner code. Python is a multi-paradigm language, and mixing styles is common practice. In fact, for a lot of problems, you will often solve some parts of the problem in a functional way and other parts with objects ([Nelson, 2024](https://www.oreilly.com/library/view/software-engineering-for/9781098136192/)). So, Keeping both tools in my toolbox made my code cleaner, more flexible, and readable.

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
According to [PEP 8](https://peps.python.org/pep-0008/), class names should use the `PascalCase` convention. That means I write `class Car:` or `class BankAccount`, not `class car` or `class bank_account`. By contrast, methods and functions should be `snake_case`. As we said in [lecture 1](https://m101yosef.github.io/teaching/modular-python/lecture1), following these naming rules helps coders (like you and me) read the code more easily. 

### The initialisation constructor 
Every class can define a special method named `__init__()`, which Python calls automatically when creating a new instance. This method, as the name suggested, initialises the object's initial state. In my `Car` example, `__init__` takes color and speed as parameters and assigns them to the instance. So, consider `__init__` as your chance to set up any attributes the object needs. 

```python
class Book: 
    def __init__(self, title, author, year, pages = None): 
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


<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> The digital bookshelf
</div>

You are building a system to catalogue your book collection. Your task is to define a `Book` class that can hold the title, author, and publication year of a book.
1. Create a class named `Book`. Remember the `PascalCase` convention for class names. 
2. Define the constructor `__init__` method. This method should accept `title`, `author`, and `year` as arguments. 
3. Inside `__init__`, assign these arguments to instance attributes. It's conventional to use the same names, e.g., `self.title = title`. 
4. After defining the class, create at least two different `Book` objects representing your favourite books. 
5. Print out the `title` and `author` of each book object you created to make sure the attributes were set correctly. 

<details>
<summary>hint</summary>

The `__init__` method is the first place you'll use the `self` keyword. It refers to the specific instance of the class being created. Every time you create a new book, `self` points to that specific book.

</details>

<details>
<summary>solution</summary>

```python
# 1. Define the Class with PascalCase naming
class Book:
    # 2. Write the constructor
    def __init__(self, title, author, year):
        """Initialises a new Book object."""
        # 3. Assign attributes to the instance (self)
        print(f"Creating a book: {title}...")
        self.title = title
        self.author = author
        self.year = year

# 4. Instantiate two objects from our Book class
book1 = Book("Dune", "Frank Herbert", 1965)
book2 = Book("The Pragmatic Programmer", "Andrew Hunt & David Thomas", 1999)

# 5. Verify the attributes of each instance
print("\n--- My Bookshelf ---")
print(f"Book 1 Title: {book1.title}, Author: {book1.author}")
print(f"Book 2 Title: {book2.title}, Author: {book2.author}")
```

</details>
</div>


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
class OurArray:
    """
    A simple array class with methods for sum and mean.
    """
    def __init__(self, data): 
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


<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> The <code>SimpleStack</code> Project
</div>

To build a custom `SimpleStack` class that encapsulates a list, implements the LIFO (Last-In, First-Out) principle, and integrates with Python's built-in functions via dunder methods 

**Note**: <br>
Dunder methods, also known as magic methods or special methods, are a core feature of Python's object model. The term "dunder" is an abbreviation for "double underscore", referring to the characteristic naming convention where these methods are enclosed by double underscores (e.g., `__init__`, `__str__`, `__add__`)

**Part A: The initialisation**
1. Define a class called `SimpleStack`. Its `__init__` method should create a single "internal" instance attribute, `items`, and initialise it as empty list. 

**Part B: Methods** <br>
Implement the essential methods that define a stack's behaviour. <br>
2. `push(self, item)` that adds an `item` to the top of the stack. <br>
3. `pop(self)` that removes and returns the item from the top of the stack. If the stack is empty, this should raise an `IndexError` (which `list.pop()` does automatically). <br>
4. `peek(self)` that returns the top item without removing it. <br>
5. `is_empty(self)` that returns `True` if the stack has no items, `False` otherwise. <br>

**Part c: Dunder methods** <br>
Make your class feel more like a native Python object by implementing these dunder methods: <br>
6. `__len__(self)` should return the number of items currently in the stack. <br>
7. `__str__(self)` should return a user-friendly string representation, e.g., `SimpleStack([item1, item2, 'top'])`. <br>

**Part D: Last touches** <br>
Write a script after your class definition to test its LIFO functionality <br>
8. Create an instance of `SimpleStack`. <br>
9. Push the strings 'A', 'B', and 'C' onto the stack. <br>
10. Print the stack to see its contents. <br>
11. Print the length of the stack. <br>
12. Use `.peek()` to see the top item ('C'). <br>
13. Use `.pop()` to remove the top item and print the removed item. <br>
14. Print the stack again to show that 'C' is gone. <br>


<details>
<summary>hint</summary>

A Python list's `.append()` method is perfect for a `push` operation, and its `.pop()` method (with no arguments) already implements the LIFO behaviour you need for your `pop` method.

</details>

<details>
<summary>solution</summary>

```python
class SimpleStack:
    """
    A simple stack implementation that follows the LIFO principle.
    """
    # Part A: The Skeleton
    def __init__(self):
        """Initialises the SimpleStack with an empty list for storage."""
        self._items = []

    # Part B: Core Stack Behaviour
    def push(self, item):
        """Adds an item to the top of the stack."""
        self._items.append(item)

    def pop(self):
        """Removes and returns the top item from the stack."""
        if self.is_empty():
            raise IndexError("pop from an empty stack")
        return self._items.pop()

    def peek(self):
        """Returns the top item without removing it."""
        if self.is_empty():
            return None
        return self._items[-1]

    def is_empty(self):
        """Returns True if the stack is empty, False otherwise."""
        return len(self._items) == 0

    # Part C: Python Integration
    def __len__(self):
        """Allows the len() function to work on this object."""
        return len(self._items)

    def __str__(self):
        """Provides a user-friendly string representation of the stack."""
        return f"SimpleStack({self._items})"

# Part D: Putting It All Together
print("--- Testing SimpleStack ---")

# 1. Create an instance
s = SimpleStack()
print(f"Is stack empty? {s.is_empty()}")

# 2. Push items
s.push('A')
s.push('B')
s.push('C')

# 3. Print the stack
print(f"Stack after pushes: {s}")

# 4. Print the length
print(f"Length of stack: {len(s)}")

# 5. Peek at the top item
top_item = s.peek()
print(f"Peeking at top item: {top_item}")

# 6. Pop the top item
popped_item = s.pop()
print(f"Popped item: {popped_item}")

# 7. Print the stack again
print(f"Stack after pop: {s}")
print(f"Length after pop: {len(s)}")
```

</details>
</div>


## Final note on OOP
From my small experience, OOP is valuable because it promotes modular, reusable, and maintainable code. OOP almost checks all performance books, it is optimised for speed, memory, and most importantly scalability. Whenever you need to extend the functionality of your program, I can often add a new class or method without rewriting everything. 



## References

[<span>1</span>] Guido van Rossum, Barry Warsaw, & Alyssa Coghlan. (2001). PEP 8 - Style Guide for Python Code. https://peps.python.org/pep-0008/ <br>
[<span>2</span>] Catherine Nelson. (2024). Software Engineering for Data Scientists. O’Reilly Media, Inc. https://www.oreilly.com/library/view/software-engineering-for/9781098136192/ <br>




