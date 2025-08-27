---
title: "6. Classes, instances, and constructors"
date: 2025-08-25
weight: 6
type: docs
tags: 
- Python
---

When I first began programming in Python, I was doing messy code (most beginner data scientist are famous for their messy code). Then, I learned [functional programming](https://m101yosef.github.io/teaching/advanced-python/lecture3); the Python main point of using functions is to avoid repetition as mention in [PEP 8](https://peps.python.org/pep-0008/) performance tips (DRY) which is: don't repeat yourself. While the true idea behind function programming is to use pure functions like `map`, `filter`, or `reduce` to transform your data without side effects&mdash;this means that the function only effects its input not other parts of the code. However, when I start using PyTorch for building custom neural networks, I found that combining FP techniques with object-oriented programming (OOP) often yields cleaner code. Python is a multi-paradigm language, and mixing styles is common practice. In fact, for a lot of problems, you will often solve some parts of the problem in a functional way and other parts with objects. So, Keeping both tools in my toolbox made my code cleaner, more flexible, and readable.

From a historical perspective, OOP itself was born out of the need to model complex systems in code. In the 1960s, languages like Simula (1961 - 1967) introduced essential OOP ideas such as classes, inheritance, and dynamic binding. These allowed programmers to group data and behaviour into "objects" instead of only writing procedural steps. Over decades, many programming languages uses OOP as their main style like Java and C++. Today, many Python tools, library, even Python itself embraces OOP, providing classes, inheritance, and polymorphism similar to legendary programming languages. 

## Defining Classes in Python

In OOP, a **class** is a blueprint for creating objects. In Python, I define a class using the `class` keyword. For example:

```python
class Car:
    """A simple class representing a car."""
    def __init__(self, color, speed):
        self.color = color
        self.speed = speed
```

When I write `class Car:`, Python bundles data and functions together into one unit. As the official docs explain, “Classes provide a means of bundling data and functionality together”docs.python.org. In the snippet above, `Car` is a new type, and each instance will have a `color` and `speed` attribute (set by `__init__`). **Naming convention:** According to PEP 8 (Python’s style guide), class names should use the **`CapitalizedWords`** (CapWords) conventionpeps.python.org. That means I write `class Car` or `class BankAccount`, not `class car` or `class bank_account`. By contrast, methods and functions should be `lowercase_with_underscores`peps.python.orgpeps.python.org. Following these naming rules helps others (and me) read the code more easily.



## The `__init__` Constructor

Every class can define a special method named `__init__()`, which Python calls automatically when creating a new instance. This method initializes the object’s initial state. In my `Car` example, `__init__` takes `color` and `speed` as parameters and assigns them to the instance. The Python documentation notes: “When a class defines an `__init__()` method, class instantiation automatically invokes `__init__()` for the newly created class instance.”docs.python.org. In effect, `__init__` is my chance to set up any attributes the object needs. Here’s another example with `__init__` and an instance attribute:

```python
class Movie:
    def __init__(self, title, year):
        self.title = title     # attribute storing the movie's title
        self.year = year       # attribute storing the release year
# Create a new instance of Movie
film = Movie("The Matrix", 1999)
print(film.title, film.year)  # Output: The Matrix 1999
```

When I write `film = Movie("The Matrix", 1999)`, Python creates a new `Movie` object and automatically calls `__init__(film, "The Matrix", 1999)`, setting `film.title` and `film.year`. The `self` parameter inside `__init__` refers to the instance being created (more on `self` below). After construction, every `Movie` object has its own `title` and `year` attributes attached. **Exercise:** Define a class `Rectangle` that takes `width` and `height` in its `__init__`, and stores them as attributes. Then add a method `area()` that returns the rectangle’s area (width × height). For example:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height
# Test the class
rect = Rectangle(3, 4)
print(rect.area())  # Expected output: 12
```



## Attributes: The Object’s “Adjectives”

Attributes are the data stored in an object – think of them like the adjectives or properties that describe it. In the `Rectangle` example above, `width` and `height` are attributes describing each rectangle’s size. In the `Movie` example, `title` and `year` are attributes describing the movie. I often think of attributes as the object’s **state** or **settings**. By default, I define attributes inside `__init__` by assigning to `self`, e.g. `self.color = "red"`. Python creates the attribute on the instance when it is first assigned. The Python tutorial points out that data attributes “spring into existence when they are first assigned to”docs.python.org. (I could also add attributes elsewhere, but `__init__` is a good centralized place.) It’s important to distinguish **instance attributes** (unique to each object) from **class attributes** (shared by all objects of that class). In the docs’ example, a class variable `kind = 'canine'` would be shared across all `Dog` instances, while `self.name` is unique for each dogdocs.python.org. As a best practice, I use instance attributes for per-object data. **Exercise:** Try adding another method to the `Rectangle` class, for example `perimeter()` that returns `2*(width+height)`. Instantiate a rectangle and call this new method to verify it works.



## Methods: The Object’s “Actions”

Methods are functions defined inside a class that describe what an object can do – think of methods as the object’s verbs or actions. When I define a method in a class, it takes `self` (the instance) as the first parameter. For example:

```python
class Counter:
    def __init__(self, start=0):
        self.count = start
    def increment(self):
        self.count += 1        # method modifies the attribute
    def display(self):
        print(f"Count is {self.count}")
```

Here, `increment` and `display` are methods of `Counter`. The Python docs explain, “A method is a function that ‘belongs to’ an object”docs.python.org. Each method operates on `self`, the instance. In the `increment` method, `self.count` is changed; in `display`, `self.count` is read and printed. When I **call** a method on an instance (e.g. `c.increment()`), Python under the hood does two things: it looks up `increment` on the class and then **binds** it to the instance `c`. The language reference explains that calling `c.increment()` automatically passes `c` as the first argument to the underlying function. In other words, `c.increment()` is exactly equivalent to `Counter.increment(c)`docs.python.org. This binding is why we always write instance methods with `self` as the first parameter. (PEP 8 even says “Always use `self` for the first argument to instance methods”peps.python.org.) As a quick example of methods in action:

```python
class Person:
    def __init__(self, name):
        self.name = name
    def greet(self):
        print(f"Hello, I'm {self.name}!")

p = Person("Alice")
p.greet()  # prints: Hello, I'm Alice!
```

When `p.greet()` is called, Python passes `p` into the method as `self`, so it prints the greeting using `p’s` own `name`. This shows how the method (action) can access the object’s attributes (data) to behave correctly for that particular instance.


## Example: Building a Simple Array Class

To tie everything together, I often build toy examples. For instance, I might write a simple class that mimics a tiny subset of a NumPy-like array. Here's a `MyArray` class that stores a list of numbers and has methods to compute the mean and to add a value to all elements:

```python
class MyArray:
    def __init__(self, data):
        self.data = list(data)   # store data as a list

    def mean(self):
        return sum(self.data) / len(self.data)

    def add(self, value):
        # returns a new MyArray with 'value' added to each element
        new_data = [x + value for x in self.data]
        return MyArray(new_data)
# Example usage:
arr = MyArray([1, 2, 3, 4])
print(arr.mean())        # Output: 2.5
arr2 = arr.add(5)
print(arr2.data)         # Output: [6, 7, 8, 9]
```

In this snippet, `MyArray` is a class (CapWords style) with an `__init__` that sets the `data` attribute. The `mean` and `add` methods use `self.data` to perform actions. Notice how `add` returns a new `MyArray` object; this exemplifies how methods can create and return new instances. The code demonstrates key concepts: class definition, naming, constructor, attributes (data), methods (`mean`, `add`), and use of `self`.


## Why OOP Matters (Best Practices)

From my experience, OOP is valuable because it promotes **modular**, **reusable**, and **maintainable** code. By encapsulating data and behavior in classes, I can build complex systems as collections of interacting objects. As one blog notes, OOP “makes programs more organized, easier to maintain, and simpler to update or expand over time”webcreek.com. This modularity means that if I need to extend functionality, I can often add a new class or method without rewriting everything. Another author emphasizes that OOP helps “model complex systems” and “promote[s] code reuse”python.plainenglish.io. In practical terms, I follow these best practices:

**Naming:** Use CapWords for class names (e.g. `StudentRecord`)peps.python.org. Method and attribute names should be lowercase with underscores (snake\_case)peps.python.orgpeps.python.org. Clear, consistent naming makes code self-documenting.

**self usage:** Always include `self` as the first parameter of instance methodspeps.python.org. This convention is crucial – it explicitly gives each method access to the object’s own data.

**Encapsulation:** Keep each class focused on a single responsibility. Avoid “God objects” that do too many unrelated things. When in doubt, I make attributes with a leading underscore to signal they are for internal use only (PEP 8 advises one leading underscore for non-public attributes)peps.python.org.

**Docstrings:** For any public class or method, I write a docstring to explain what it does. This practice isn’t required by OOP itself but is part of writing clean, maintainable object-oriented code.

By following these conventions and understanding the OOP building blocks, I’ve found that writing and maintaining Python software becomes much easier. The abstractions created by classes and objects allow me to map real-world or problem-domain concepts directly into code, improving clarity and reducing bugs. In summary, blending functional techniques with well-designed classes gives me powerful tools to tackle complex programming tasks. 

## Exercises 
1. Pick a real-world object (like a `Book`, `BankAccount`, or `Playlist`) and try designing a Python class for it. Define relevant attributes (the object’s “adjectives”) and one or two methods (the object’s “actions”). Instantiate the class and call its methods to see how the attributes and methods work together. 