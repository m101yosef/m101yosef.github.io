---
title: "7. OOP Methods: instance, class, and static"
date: 2025-08-27
weight: 7
type: docs
tags: 
- Python
---

Continuing our journey together in the world of OOP in Python, today, we are going to go deeper in one of the most important building blocks of the class which is the method. Up till now, we only used one type of methods (instance methods) that defines with `self` and considered to be the most common type of methods. While instance methods are great, there are two other type of methods: class methods and static methods. So, in this lecture, we will try to find out the (why, how, when) to use them. We will go only with one example; the `Book` class.

```python
class Book: 

  # Attributes / book's properties
  def __init__(self, title, author, year, pages): 
    self.title = title
    self.author = author
    self.year = year
    self.pages = pages

# example usage 
spider = Book("The Spider", "Mustafa Mahmoud", 1995, 50)  # class instance
print(f"I'm reading {book.title} by {book.author}")
```
The code here is very simple, we have just created a class `Book` with 4 attributes: title, author, year, and pages. Then I have created an instance of that class called `spider` which contains the spider book by Mustafa Mahmoud (one of my favourite author of all times). After that, I printed out only two attributes; the book's title and author. 

## Instance methods
At first, an instance is the object that we created from the class. Think of a class as a blueprint or a template that defines the properties (attributes) and actions (methods) that all objects of that type will have. An instance is one use case from that template (class). For our example `spider` will be an instance created from the class `Book`. So, instance methods is a function defined inside a class that operates on a given instance of the class. Its primary purpose is to access and manipulate the data (known as instance variables or attributes) that is unique to that particular object. In our case, at least the book title and author are unique to the `spider` book. No other book will have the same title and author in the same time since the author won't give the same title to two of his books (hopefully).

One thing that is obviously important is that the first parameter in the method `self` is a reference to the instance itself (hint: the name!). This first parameter `self` allows the method to know which specific object it is working with. So, the advantage of instance methods over class and static methods is that it can read and modify instance's data and control the instance behaviour. 

```python
class Book: 

  # Attributes / instance data
  def __init__(self, title, author, year, pages): 
    self.title = title
    self.author = author
    self.year = year
    self.pages = pages
  
  # Methods
  def reading_time(self, reading_speed_wpm=250): 
    """
    Calculates the approximate reading time based on a given speed. 
    Assumes an average speed of 250 words per page. 
    """
    total_words = self.pages*250
    print(f"total words = {total_words}")
    total_time = total_words / reading_speed_wpm
    print(f"total time = {total_time}")
    hours = int(total_time // 60)
    if hours == 0: 
      return f"Approximate reading time: {int(total_time)} minutes"
    else: 
      minutes = int((total_time/60 - hours) * 60)
      return f"Approximate reading time: {hours}h {minutes}m"

# example 
book = Book("The Spider", "Mustafa Mahmoud", 1995, 50)
print(book.reading_time())
```

```
total words = 12500
total time = 50.0
Approximate reading time: 50 minutes
```

Here, `reading_time` is an instance method that uses the instance number of pages `self.pages` to estimate the reading time based on a given speed that is given by the user. 

**When to use instance methods?** <br>
You can consider instance methods as your default options for OOP methods. Use them for any action that requires reading and modifying the data of the object/instance. 


## Class methods
Marked with the `@classmethod` decorator and take `cls` as its first parameter instead of `self` since we are referring to the class itself not the instance. 

```python
class MyClass: 
    @classmethod
    def my_class_method(cls, ...): 
        ...
```

Since `cls` refers to the class itself, you would except that we will be able to work with class data not with instance data this time and that is completely true. However, I thing it is best to see the major possible ways that we can apply class methods to our `Book` class...


### Alternative constructors (factory methods)
It's another simple, descriptive way of creating class instance. This approach offers clarity and flexibility beyond the standard `__init__` constructor. 

```python
class Book: 
    def __init__(self, title, author, year, pages): 
        # rest code is the same 
    
    # alternative way to create class instance
    @classmethod
    def from_string(cls, book_string): 
        try: 
            title, author, year, pages = [part.strip() for part in book_string.split(',')]
            return cls(title, author, int(year), int(pages))
        except ValueError as e: 
            print(f"Error creating book from string: {e}")
            return None

# --- Example Usage ---
book2 = Book.from_string("Soul and Body, Mustafa Mahmoud, 1986, 116")
print(
    "Second book data: ", 
    f"Title: {book2.title}",
    f"Author: {book2.author}",
    f"Year: {book2.year}", 
    f"Pages: {book2.pages}",
    sep="\n"
)
```

```
Second book data: 
Title: Soul and Body
Author: Mustafa Mahmoud
Year: 1986
Pages: 116
```
Here `from_string` is a class method that uses `cls(title, author, int(year), int(pages))` to create a new instance. This helps your users as they will not have to deal with putting a year as integers not as string and so on. 

### Managing class-level state
As I just said class methods are ideal for interacting with class variables that are shared across all instances of a class. By this, you can maintain a count of all instances created from your class. 

```python
class Book: 
    total_books_created = 0   # class variable 

    def __init__(self, title, author, year, pages): 
        self.title = title 
        self.author = author
        self.year = year
        self.pages = pages 

        Book.total_books_created += 1   # Increase the number of books created every time we create a new instance

    @classmethod 
    def books_count(cls): 
        """Returns the total number of books created."""
        return cls.total_books_created 

book1 = Book("The Spider", "Mustafa Mahmoud", 1995, 50)
book2 = Book("Soul and Body", "Mustafa Mahmoud", 1986, 116)
book3 = Book("Dreams", "Mustafa Mahmoud", 1992, 105)

print(Book.books_count())
```

```
3
```

Now, you may ask: why you used a class method like `books_count()` over directly accessing the class variable `Book.total_books_created`? Okay, this because it encapsulates the state-related logic within the class following the principle of encapsulation and data hiding (more on that later in the next lecture).


## Static methods
They are more like a pure function in the class but just defined with `@staticmethod` decorator. So, they don't take `self` or `cls` at all. 

```python
class MyClass: 
    @staticmethod
    def my_static_method(...):
        ...
```

The absence of `self` and `cls` indicates that the method doesn't have access to instance or class data. In practice, use a static method for utility functions&mdash;validate inputs, perform a calculation, or convert units. As an example, we will use a static method to validate one of our inputs (year) to be only between 1700 and 2025 (or the current year) since you cannot find any book out of this period.

```python
import datetime

class Book: 
    def __init__(self, title, author, year, pages): 

        if not self.is_valid_year(year): 
            raise ValueError(f"Invalid year: {year} must be between 1700 and the current year")

        self.title = title 
        self.author = author 
        self.year = year
        self.pages = pages 

    @staticmethod
    def is_valid_year(year): 
        current_year = datetime.datetime.now().year 
        return 1700 <= year <= current_year 

# --- Example Usage ---
book = Book("The Spider", "Mustafa Mahmoud", 195, 50)
```

```
ValueError: Invalid year: 195 must be between 1700 and the current year
```

Some argue that if the method doesn't need `self` or `cls`, it shouldn't be in the class. But in my opinion, static methods are great when you used them as private helper or to hide utility logic from outside the class. 


## Exercises

1. Create a class `Rectangle` with attributes `width` and `height`. 
    - Add an instance method `area(self)` that returns the rectangle's area. 
    - Add a class method `square(cls, side)` that returns a `Rectangle` instance with both height and width equal to side. 
    - Add a static method `is_square(width, height)` that returns `True` if `width == height` (without needing to create an object)
    - Add typing hinting and exceptions when needed. 

2. Consider the class below. Fill in the definitions for the methods so that it works as described: 

```python
class Employee:
    company = "ABC Corp"

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def give_raise(self, percent):
        """Instance method: increase self.salary by percent%."""
        # your code here

    @classmethod
    def from_string(cls, emp_str):
        """Class method: parse 'Name-Salary' to create an Employee."""
        # your code here

    @staticmethod
    def is_valid_salary(amount):
        """Static method: return True if amount is non-negative."""
        # your code here

``` 

3. What will happen if you try calling an instance method on the class itself? For example, explain the result of the following: 

```python
class Demo:
    def hello(self):
        print("Hello")
Demo.hello()

```


## References
[<span>1</span>] Martin Breuss. (2025). Python's Instance, Class, and Static Methods Demystified. Real Python <br>
[<span>2</span>] Catherine Nelson. (2024). Software Engineering for Data Scientists. O’Reilly Media, Inc. https://www.oreilly.com/library/view/software-engineering-for/9781098136192/ <br>