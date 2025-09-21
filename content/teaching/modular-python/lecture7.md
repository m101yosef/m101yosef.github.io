---
title: "7. OOP Methods"
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


<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> Basic <code>LogEntry</code>
</div>

You are building a system that processes log files. A single log entry has a timestamp and a message. Your first task is to create a class that represents this entry.

**Instructions**:
1. Create a class named LogEntry.
2. Write the constructor. The `__init__` method should accept a `message` string. It should also automatically capture the current time using Python's `datetime` module and store it as an instance attribute called `timestamp`.
3. Create an instance method called `update_message(self, new_message)`. This method should change the `self.message` attribute to the new message provided.
4. Implement the `__str__(self)` method to return a formatted string like: `[YYYY-MM-DD HH:MM:SS] - Log Message`.
5. Create a LogEntry object. Print it. Then, call the `update_message` method to change its message. Print it again to see the change.

<details>
<summary>hint</summary>

To get the current time, you can use `from datetime import datetime` at the top of your script, and then `self.timestamp = datetime.now()` inside your `__init__` method.

</details>

<details>
<summary>solution</summary>

```python
from datetime import datetime

class LogEntry:
    """Represents a single entry in a log file."""

    def __init__(self, message):
        """Initialises a log entry with a message and the current timestamp."""
        self.message = message
        self.timestamp = datetime.now()

    def update_message(self, new_message):
        """Updates the message of this specific log entry."""
        self.message = new_message

    def __str__(self):
        """Returns a user-friendly string representation of the log entry."""
        # The .strftime('%F %T') formats the date and time nicely.
        return f"[{self.timestamp.strftime('%F %T')}] - {self.message}"

# --- Test Script ---
print("--- Testing Instance Methods ---")
log1 = LogEntry("User logged in successfully.")
print(f"Original Log: {log1}")

# Let's update the message to be more specific
log1.update_message("User 'admin' logged in successfully.")
print(f"Updated Log:  {log1}")
```

</details>
</div>


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


<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> Tracking and creating logs
</div>

Extend your `LogEntry` class with class-level functionality.

**Part A: Tracking total logs**
1. Add a class attribute `log_count = 0` to the `LogEntry` class. 
2. Modify the `__init__` method so that it increments `LogEntry.log_count` every time a new instance is created. 
3. Add a class method called `get_total_log(cls)` that returns the current value of `cls.log_count` 

**Part B: Alternative constructor from a file line**
Log files often have a standard format. Imagine we need to parse a line like `"ERROR: Database connection failed"`.
1. Add a class method `from_log_line(cls, line)`.
2. This method should parse the `line`, assuming the format is `"LEVEL: Message"`. It should extract the message part.
3. It should then create and return a new instance of the `LogEntry` class by calling the primary constructor: `cls(message)`.

**Part C: Test script**
After updating your class, create a few logs normally. Then, create on log using your new `from_log_line` method. Finally, call `get_total_logs` to see the total count. 

<details>
<summary>hint</summary>

For Part B, the `.split(': ', 1)` string method is perfect for splitting the line into two parts at the first occurrence of `': '`.

</details>

<details>
<summary>solution</summary>

```python
from datetime import datetime

class LogEntry:
    # Part A: Class attribute
    log_count = 0

    def __init__(self, message):
        self.message = message
        self.timestamp = datetime.now()
        # Part A: Increment the class attribute via the class name
        LogEntry.log_count += 1

    def __str__(self):
        return f"[{self.timestamp.strftime('%F %T')}] - {self.message}"

    # Part A: Class method for managing class state
    @classmethod
    def get_total_logs(cls):
        """Returns the total number of log entries created."""
        return cls.log_count

    # Part B: Class method as an alternative constructor
    @classmethod
    def from_log_line(cls, line):
        """Creates a new log entry by parsing a string line."""
        # Assuming format "LEVEL: Message"
        try:
            _, message_part = line.split(': ', 1)
            return cls(message_part) # Calls the __init__ method
        except ValueError:
            # Handle cases where the line format is wrong
            return cls(f"Malformed log line: '{line}'")

# --- Test Script ---
print("\n--- Testing Class Methods ---")
log1 = LogEntry("System start.")
log2 = LogEntry("Checking connections.")
print(f"Log 1: {log1}")
print(f"Log 2: {log2}")

# Create a log from a string
log_line = "INFO: User data processed."
log3 = LogEntry.from_log_line(log_line)
print(f"Log 3 (from string): {log3}")

# Check the total count using the class method
total = LogEntry.get_total_logs()
print(f"\nTotal logs created: {total}")
```

</details>
</div>


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


<div class="exercise">
<div id="practical-exercise-3" class="exercise-head">
<b>Practical exercise 3:</b> A log utility
</div>

Add a utility function to your `LogEntry` class to format a dictionary of metadata into a string. This is a common need in logging, but it doesn't require access to any specific log's data or the class's overall state.

**Instructions**
1. Create a static method called `format_metadata(metadata_dict)`.
2. This method should take a dictionary and convert it into a string of key-value pairs, for example: `"[user_id=101, request_id=xyz-987]"`. If the dictionary is empty, it should return an empty string.
3. Call this method directly on the class (`LogEntry.format_metadata(...)`) with a sample dictionary to see the output. You don't need to create an instance for this.


<details>
<summary>hint</summary>

A static method is defined with the `@staticmethod` decorator and does not take `self` or `cls` as its first argument. You can use a list comprehension and the `.join()` method to build the string nicely.

</details>

<details>
<summary>solution</summary>

```python
# (Assuming the LogEntry class from the previous exercise is here)
class LogEntry:
    # ... (all previous code from Exercise 2) ...

    # Exercise 3: Static method as a utility function
    @staticmethod
    def format_metadata(metadata_dict):
        """
        Formats a dictionary of metadata into a standardised string.
        This does not need access to instance or class state.
        """
        if not metadata_dict:
            return ""
        
        parts = [f"{key}={value}" for key, value in metadata_dict.items()]
        return f"[{', '.join(parts)}]"

# --- Test Script ---
print("\n--- Testing Static Methods ---")
metadata = {
    'user_id': 101,
    'request_id': 'xyz-987'
}

# Call the static method directly on the class
formatted_meta = LogEntry.format_metadata(metadata)
print(f"Formatted metadata: {formatted_meta}")

# Example of how it might be used with a log entry
log4 = LogEntry("Payment processed.")
print(f"{log4} {formatted_meta}")

# Test with empty metadata
empty_meta = LogEntry.format_metadata({})
print(f"Formatted empty metadata: '{empty_meta}'")
```

</details>
</div>



## References
[<span>1</span>] Martin Breuss. (2025). Python's Instance, Class, and Static Methods Demystified. Real Python <br>
[<span>2</span>] Catherine Nelson. (2024). Software Engineering for Data Scientists. O’Reilly Media, Inc. https://www.oreilly.com/library/view/software-engineering-for/9781098136192/ <br>