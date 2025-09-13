---
title: "8. OOP Principles"
date: 2025-08-31
weight: 8
type: docs
tags: 
- Python
---


Up till now, we've looked at the heart of object-oriented programming (OOP) in Python: classes and objects. A class is a blueprint for creating objects, and an object is an instance of a class. But OOP is more than just classes and objects; it encompasses several key principles that help us design robust and maintainable software. And, this is the reason why I'm writing this lecture. The principles that we are going to talk about today are not just things to learn for the sake of knowledge but more of a school of thought that will help you become an advanced coder only if you know when and how to use them. So, this it is not just about the learning. That's why, after this lecture, I want you to continue this journey of making the best use of OOP and even discover new ways for our own projects.


To be clear about the application that we are going to build, we will continue the `Book` class example from the previous lecture. We will add more functionality to it and see how we can apply OOP principles to explore our options.

Our starting point will be a `Book` class that includes properties for data validation, which is a more Pythonic way to handle attribute access and modification.

```python
class Book: 
    def __init__(self, title: str, author: str, year: int):
        self.title = title
        self.author = author
        self.year = year

    def __repr__(self) -> str:
        """Return a string representation of the book."""
        return f"{self.title} by {self.author}, published in {self.year}"

book1 = Book("The Spider", "Mustafa Mahmoud", 1995)
print(book1)
```

```
The Spider by Mustafa Mahmoud, published in 1995
```


## OOP Principles: high-level overview
You will often hear about the four main principles of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism. Let's briefly define each of these principles before diving into examples.

1. **Encapsulation**: grouping related data (attributes) and behaviours (methods) into a single unit (class) and restricting access to some of the object's components. This is only done to prevent the accidental modification of data and hide implementation details from the user.
    - Public attributes: accessible from anywhere. `self.title`
    - Protected attributes: accessible within the class and its subclasses. Conventionally prefixed with a single underscore `_`. `self._title`
    - Private attributes: accessible only within the class. Conventionally prefixed with a double underscore `__`. `self.__title`

2. **Abstraction**: simplifying complex reality by modelling classes based on the essential properties and behaviours an object should have, while ignoring irrelevant details. This helps in reducing complexity and increases efficiency as well as making the class easier to use without knowing the inner details. 
    - Use abstract base classes and interfaces to define common methods that must be implemented by derived classes (`abc` module).
    - Example: define a `Shape` class with an abstract method `area()`, and then create subclasses like `Circle` and `Rectangle` that implement the `area()` method.

3. **Inheritance**: a mechanism where a new class (subclass/child class) can inherit attributes and methods from an existing class (superclass/parent class). This promotes code reusability and establishes a hierarchical relationship between classes.
    - Example: create a `EBook` class that inherits from the `Book` class and adds additional attributes like `file_format` and `file_size`.

4. **Polymorphism**: the ability of different classes to be treated as instances of the same class through a common interface. It allows methods to do different things based on the object it is acting upon, even if they share the same name.
    - Method overriding: a subclass can provide a specific implementation of a method that is already defined in its superclass.
    - Example: both `EBook` and `PrintedBook` classes can have a method `get_info()`, but they provide different implementations based on their specific attributes.

Now, let's explore each of these principles in detail with examples.


## 1. Encapsulation
As I just told you, encapsulation is about restricting access to certain components of an object to prevent accidental modification of data and hide implementation details from the user. When I first learned about encapsulation, I thought it was just about using private attributes. But it's more than that. It's about designing your classes in a way that protects the integrity of the data and provides a clear interface for interacting with the object.

Python, unlike many other programming languages, does not enforce access restrictions. Instead, it relies on conventions to indicate the intended level of access.
- **Public members** (attributes and methods) are accessible from anywhere. They can be accessed from any part of the program without restriction.
- **Protected members** are intended to be accessed only within the class and its subclasses. By convention, they are prefixed with a single underscore (`_`). This is a hint to developers that these members should not be accessed directly from outside the class.
- **Private members** are intended to be accessed only within the class itself. They are prefixed with a double underscore (`__`). This triggers name mangling, which makes it harder (but not impossible) to access these members from outside the class.

Let's modify our `Book` class to demonstrate encapsulation:

```python
class Book: 
    def __init__(self, title: str, author: str, year: int):
        self.__title = title  # Private attribute
        self._author = author  # Protected attribute
        self.year = year  # Public attribute

    def get_title(self) -> str:
        """Public method to access the private title attribute."""
        return self.__title

    def set_title(self, title: str):
        """Public method to modify the private title attribute."""
        if isinstance(title, str) and title:
            self.__title = title
        else:
            raise ValueError("Title must be a non-empty string.")

    def __repr__(self) -> str:
        """Return a string representation of the book."""
        return f"{self.__title} by {self._author}, published in {self.year}"

book1 = Book("The Spider", "Mustafa Mahmoud", 1995)
print(book1)
```

While the underscore conventions are useful, the @property decorator provides a more Pythonic way to manage access to attributes. It allows you to define methods that can be accessed like attributes, providing a clean interface for getting and setting values while still encapsulating the underlying data.

```python
class Book: 
    def __init__(self, title: str, author: str, year: int):
        self.__title = title  # Private attribute
        self._author = author  # Protected attribute
        self.year = year  # Public attribute

    @property
    def title(self) -> str:
        """Public property to access the private title attribute."""
        return self.__title

    @title.setter
    def title(self, title: str):
        """Public property setter to modify the private title attribute."""
        if isinstance(title, str) and title:
            self.__title = title
        else:
            raise ValueError("Title must be a non-empty string.")

    def __repr__(self) -> str:
        """Return a string representation of the book."""
        return f"{self.__title} by {self._author}, published in {self.year}"

book1 = Book("The Spider", "Mustafa Mahmoud", 1995)
print(book1)
book1.title = "The New Spider"  # Using the property setter
print(book1.title)  # Using the property getter
print(book1)
```

```
The Spider by Mustafa Mahmoud, published in 1995
The New Spider
The New Spider by Mustafa Mahmoud, published in 1995
```

## 2. Abstraction 
Simplifying complex reality by modelling classes based on the essential properties and behaviours an object should have, while ignoring irrelevant details. This helps in reducing complexity and increases efficiency as well as making the class easier to use without knowing the inner details.

Abstraction can be achieved in Python using abstract base classes (ABCs) and interfaces. The `abc` module provides the infrastructure for defining abstract base classes. An abstract base class can define methods that must be created within any child classes derived from the abstract base class. This ensures that certain methods are implemented in subclasses, providing a consistent interface.

Let's define an abstract base class `Readable` with an abstract method `get_content()`, and then create subclasses like `Book` and `Magazine` that implement the `get_content()` method.

```python
from abc import ABC, abstractmethod

class Readable(ABC):
    @abstractmethod
    def get_content(self) -> str:
        """Abstract method to get the content of the readable item."""
        pass

# Our Book class now formally implements the Readable interface
class Book(Readable):
    def __init__(self, title: str, author: str, year: int):
        self.__title = title
        self._author = author
        self.year = year

    @property
    def title(self) -> str:
        return self.__title

    @title.setter
    def title(self, new_title: str):
        if isinstance(new_title, str) and new_title:
            self.__title = new_title
        else:
            raise ValueError("Title must be a non-empty string.")

    # This is the required method from the Readable ABC
    def get_content(self) -> str:
        return f"Content of the book '{self.title}' by {self._author}."

    def __repr__(self) -> str:
        return f"{self.title} by {self._author} ({self.year})"

# A second implementation of Readable
class Magazine(Readable):
    def __init__(self, title: str, issue: int):
        self.title = title
        self.issue = issue

    def get_content(self) -> str:
        """Return the content of the magazine."""
        return f"Content of the magazine '{self.title}', Issue {self.issue}."

    def __repr__(self) -> str:
        return f"{self.title}, Issue {self.issue}"

book1 = Book("The Spider", "Mustafa Mahmoud", 1995)
magazine1 = Magazine("Tech Today", 42)

print(book1)
print(book1.get_content())
print(magazine1)
print(magazine1.get_content())
```

```
The Spider by Mustafa Mahmoud (1995)
Content of the book 'The Spider' by Mustafa Mahmoud.
Tech Today, Issue 42
Content of the magazine 'Tech Today', Issue 42.
```

## 3. Inheritance 
A powerful mechanism that allows a new class, known as the subclass or child class, to derive properties and methods from an existing class, called the superclass or parent class. This relationship is a critical tool for modelling real-world hierarchies and is often described as an "is-a" relationship. For example, an `EBook` is a type of `Book`, so it makes sense for `EBook` to inherit from `Book`.

Python supports both single inheritance (a class inherits from one superclass) and multiple inheritance (a class inherits from more than one superclass). However, multiple inheritance can lead to complexity and ambiguity, so it should be used judiciously. A fundamental detail in Python is that all new-style classes implicitly inherit from the base `object` class, making it the ultimate root of all class hierarchies. 

Let's create an `EBook` class that inherits from the `Book` class and adds additional attributes like `file_format` and `file_size`.

```python
class EBook(Book):
    def __init__(self, title: str, author: str, year: int, file_format: str):
        # Call the parent constructor to handle common attributes
        super().__init__(title, author, year)
        self.file_format = file_format  # Add an attribute specific to EBook

    # Override get_content for a specialized behaviour
    def get_content(self) -> str:
        return f"Opening the e-book '{self.title}' in {self.file_format} format."

    # Override __repr__ to include the new attribute
    def __repr__(self) -> str:
        # Note: self._author is accessible because it is protected, not private
        return (
            f"{self.title} by {self._author} ({self.year}) "
            f"[{self.file_format}]"
        )

ebook1 = EBook("Digital Fortress", "Dan Brown", 1998, "PDF")
print(ebook1)
print(ebook1.get_content())
```

```
Digital Fortress by Dan Brown (1998) [PDF]
Opening the e-book 'Digital Fortress' in PDF format.
```

### Method Overriding and the role of super() 
Method overriding is the process by which a subclass provides a specific implementation of a method that is already defined in its superclass. This allows the subclass to change or specialise the behaviour of that method to suit its needs.

The `super()` function is a built-in function in Python that allows you to call methods from a parent class. It is commonly used in the context of inheritance to ensure that the parent class's methods are properly invoked, especially when overriding methods in a subclass.

In the `EBook` class above, we used `super().__init__(title, author, year)` to call the constructor of the `Book` class. This ensures that the `title`, `author`, and `year` attributes are initialized correctly by the parent class before we add the new attributes specific to `EBook`.

### Method Resolution Order (MRO)
In cases of multiple inheritance, Python uses the C3 linearization algorithm to determine the method resolution order (MRO). This ensures a consistent and predictable order in which base classes are searched when looking for a method. You can view the MRO of a class using the `mro()` method or the `__mro__` attribute.

```python
# Example of MRO in action with a diamond inheritance pattern 
class Readable: 
    def get_content(self): 
        print("Content from a readable source.")  

class Book(Readable): 
    def get_content(self): 
        print("Content from a book.")  
        
class Magazine(Readable): 
    def get_content(self): 
        print("Content from a magazine.")  

class Periodical(Book, Magazine): 
    pass  

periodical = Periodical() 
periodical.get_content() 
print(Periodical.__mro__)
```

```
Content from a book.
(<class '__main__.Periodical'>, <class '__main__.Book'>, <class '__main__.Magazine'>, <class '__main__.Readable'>, <class 'object'>)
```
In this example, `Periodical` inherits from both `Book` and `Magazine`, which in turn inherit from `Readable`. When we call `get_content()` on an instance of `Periodical`, Python follows the MRO and finds the method in `Book` first, demonstrating how method resolution works in multiple inheritance scenarios.

### Mixin classes for reusable functionality
While multiple inheritance can lead to complex hierarchies, it is the underlying mechanism that enables the use of mixin classes. A mixin is a type of class that provides methods to other classes but is not intended to stand on its own. Mixins are used to add reusable functionality to classes without using inheritance from a common base class.

For example, let's create a mixin class that adds a method to display book details in a formatted way:

```python
class DisplayMixin:
    def display_info(self):
        """Mixin method to display formatted object information."""
        # Accesses public properties/attributes of any class it's mixed into
        return f"Title: {self.title}\nYear: {self.year}"

class PrintedBook(Book, DisplayMixin):
    def __init__(self, title: str, author: str, year: int,
                    pages: int, cover_type: str):

        super().__init__(title, author, year)
        self.pages = pages
        self.cover_type = cover_type

    def __repr__(self) -> str:
        return (
            f"{self.title} by {self._author}, published in {self.year}, "
            f"{self.pages} pages, {self.cover_type}"
        )

printed_book1 = PrintedBook("The Alchemist", "Paulo Coelho", 1988, 197, "Hardcover")
print(printed_book1)
print(printed_book1.display_info())  # Using the mixin method
```

```
The Alchemist by Paulo Coelho, published in 1988, 197 pages, Hardcover
Title: The Alchemist
Year: 1988
```

In this example, `DisplayMixin` provides a `display_info()` method that can be used by any class that includes it in its inheritance hierarchy. The `PrintedBook` class inherits from both `Book` and `DisplayMixin`, allowing it to use the `display_info()` method to show formatted information about the book.

## 4. Polymorphism 
Polymorphism is the ability of different classes to be treated as instances of the same class through a common interface. It allows methods to do different things based on the object it is acting upon, even if they share the same name. This is often summarised by the phrase "one interface, many implementations."


### Polymorphism via inheritance 
In the classical OOP paradigm, polymorphism is often realised via inheritance. A superclass defines a general interface (e.g., a method signature), while subclasses provide specialised implementations. This enables a uniform way of interacting with heterogeneous objects while preserving their unique behaviours.


Let's illustrate polymorphism with our `Book`, `EBook`, and `PrintedBook` classes. We will define a common method `get_info()` in each class, but each class will provide its own implementation.


```python
# We need the classes we've already defined: Book, EBook, PrintedBook
# Let's add one more for this example.
class AudioBook(Book):
    def __init__(self, title: str, author: str, year: int, duration_hours: float):
        super().__init__(title, author, year)
        self.duration_hours = duration_hours

    # Override get_content for a specialized behavior
    def get_content(self) -> str:
        return f"Playing the audiobook '{self.title}', which is {self.duration_hours} hours long."

# Create a library of different kinds of "Readable" items
my_library = [
    PrintedBook("1984", "George Orwell", 1949, 328, "Paperback"),
    EBook("Python Crash Course", "Eric Matthes", 2015, "EPUB"),
    AudioBook("Atomic Habits", "James Clear", 2018, 5.5)
]

# Call the same method on each object, regardless of its specific class
for item in my_library:
    print(item.get_content())

```

```
Content of the book '1984' by George Orwell.
Opening the e-book 'Python Crash Course' in EPUB format.
Playing the audiobook 'Atomic Habits', which is 5.5 hours long.
```

Here, we have a base class `Book` and three subclasses `EBook`, `PrintedBook` and `AudioBook`. Each class has its own implementation of the `get_content()` method. When we iterate over a list of `my_library` and call the `get_content()` method, Python dynamically determines which method to invoke based on the actual object type at runtime. This is polymorphism in action.

### Polymorphism via duck typing
The most prominent form of polymorphism in Python is Duck Typing, which is based on the principle that "if it looks like a duck and quacks like a duck, it's a duck." This means that the suitability of an object for a particular purpose is determined by the presence of certain methods and properties, rather than the actual type of the object.


```python

class Book:
    def __init__(self, title):
        self.title = title

    def read(self):
        return f"Reading the physical book '{self.title}'."


class EBook:
    def __init__(self, title):
        self.title = title

    def read(self):
        return f"Scrolling through the e-book '{self.title}'."


class AudioBook:
    def __init__(self, title):
        self.title = title

    def read(self):
        return f"Listening to the audiobook '{self.title}'."


# Polymorphism via duck typing (no shared base class)
library = [
    Book("1984"),
    EBook("Python Crash Course"),
    AudioBook("Atomic Habits")
]

for item in library:
    # Python just calls read() as long as the object has it
    print(item.read())

```


```
Reading the physical book '1984'.
Scrolling through the e-book 'Python Crash Course'.
Listening to the audiobook 'Atomic Habits'.
```

Here, we have three different classes: `Book`, `EBook`, and `AudioBook`. Each class has a `read()` method, but they are not related through inheritance. When we iterate over the `library` list and call `read()`, Python dynamically determines which method to invoke based on the actual object type at runtime. This is the essence of duck typing in action.


## Exercises

1. **Encapsulation Practice**
   * Create a class `BankAccount` with private attributes `_balance` and `_owner`.
   * Add methods to deposit and withdraw money, and ensure that the balance cannot be accessed or changed directly from outside the class.
   * Test your class by creating an account and performing some transactions.

<details>
<summary>Hint</summary>

* Use `__balance` for encapsulation.
* Provide methods `deposit()` and `withdraw()` for safe access.
* Test by creating an object and calling the methods.

</details>

<details>
<summary>Solution</summary>

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.__owner = owner
        self.__balance = balance

    def deposit(self, amount):
        self.__balance += amount
        return self.__balance

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            return self.__balance
        else:
            return "Insufficient funds"

    def get_balance(self):
        return self.__balance


# Test
acc = BankAccount("Mohamed", 1000)
print(acc.deposit(500))
print(acc.withdraw(200))
print(acc.get_balance())
```

</details>  

<br>

2. **Abstraction with Abstract Classes**

   * Use the `abc` module to define an abstract class `Vehicle` with an abstract method `move()`.
   * Create two subclasses: `Car` and `Bicycle`, each implementing the `move()` method differently.
   * Write a program that iterates over a list of vehicles and calls `move()` on each.

<details>
<summary>Hint</summary>

* Import `ABC` and `abstractmethod` from `abc`.
* Subclasses must override the abstract method `move()`.

</details>

<details>
<summary>Solution</summary>

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def move(self):
        pass


class Car(Vehicle):
    def move(self):
        return "The car drives on the road."


class Bicycle(Vehicle):
    def move(self):
        return "The bicycle is pedalled along the path."


vehicles = [Car(), Bicycle()]
for v in vehicles:
    print(v.move())
```

</details>  

<br>

3. **Inheritance and Method Overriding**

   * Define a base class `Book` with attributes `title` and `author` and a method `description()`.
   * Create subclasses `EBook` and `AudioBook` that override the `description()` method to give more specific details.
   * Demonstrate that the correct `description()` method is called when looping over a list of books.

<details>
<summary>Hint</summary>

* Use a base class with `description()`.
* Override `description()` in each subclass with specific details.

</details>

<details>
<summary>Solution</summary>

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def description(self):
        return f"'{self.title}' by {self.author}"


class EBook(Book):
    def description(self):
        return f"E-Book: '{self.title}' by {self.author}, available digitally."


class AudioBook(Book):
    def description(self):
        return f"AudioBook: '{self.title}' by {self.author}, narrated version."


books = [
    Book("1984", "George Orwell"),
    EBook("Python Crash Course", "Eric Matthes"),
    AudioBook("Atomic Habits", "James Clear")
]

for b in books:
    print(b.description())
```

</details>  

<br>

4. **Polymorphism with Duck Typing**

   * Create three unrelated classes: `Printer`, `Scanner`, and `Camera`.
   * Each class should implement a method `process()`, but with different behaviours.
   * Write a function that accepts a list of objects and calls `process()` on each.

<details>
<summary>Hint</summary>

* No need for inheritance.
* Just ensure each class has a `process()` method.

</details>

<details>
<summary>Solution</summary>

```python
class Printer:
    def process(self):
        return "Printing a document."


class Scanner:
    def process(self):
        return "Scanning a page."


class Camera:
    def process(self):
        return "Taking a photo."


def run_processes(devices):
    for d in devices:
        print(d.process())


devices = [Printer(), Scanner(), Camera()]
run_processes(devices)
```

</details>  

<br>

5. **Library System (All Principles Together)**

   * Create a base abstract class `Item` with attributes `title` and `year`, and an abstract method `info()`.
   * Create subclasses `Book`, `Magazine`, and `DVD` that implement `info()` differently.
   * Add encapsulation by making `year` a private attribute with getter and setter methods.
   * Demonstrate polymorphism by iterating over a list of `Item` objects and calling `info()` on each.

<details>
<summary>Hint</summary>

* Use `abc.ABC` and `@abstractmethod`.
* Make `year` private with `__year`.
* Override `info()` in each subclass.

</details>

<details>
<summary>Solution</summary>

```python
from abc import ABC, abstractmethod

class Item(ABC):
    def __init__(self, title, year):
        self.title = title
        self.__year = year

    def get_year(self):
        return self.__year

    def set_year(self, year):
        if year > 0:
            self.__year = year

    @abstractmethod
    def info(self):
        pass


class Book(Item):
    def info(self):
        return f"Book: {self.title}, Year: {self.get_year()}"


class Magazine(Item):
    def info(self):
        return f"Magazine: {self.title}, Published in {self.get_year()}"


class DVD(Item):
    def info(self):
        return f"DVD: {self.title}, Released in {self.get_year()}"


library = [
    Book("1984", 1949),
    Magazine("Nature", 2023),
    DVD("Inception", 2010)
]

for item in library:
    print(item.info())
```

</details>  

<br>

6. **Zoo Management System**

   * Create an abstract class `Animal` with an abstract method `make_sound()`.
   * Implement subclasses `Lion`, `Elephant`, and `Parrot`.
   * Add encapsulation by making the animal’s `age` private.
   * Show polymorphism by storing animals in a list and calling `make_sound()`.

<details>
<summary>Hint</summary>

* Use `@abstractmethod` in the base class.
* Implement `make_sound()` differently in each subclass.
* Use a private attribute `__age`.

</details>

<details>
<summary>Solution</summary>

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name, age):
        self.name = name
        self.__age = age

    def get_age(self):
        return self.__age

    @abstractmethod
    def make_sound(self):
        pass


class Lion(Animal):
    def make_sound(self):
        return f"{self.name} roars!"


class Elephant(Animal):
    def make_sound(self):
        return f"{self.name} trumpets!"


class Parrot(Animal):
    def make_sound(self):
        return f"{self.name} squawks!"


zoo = [Lion("Simba", 5), Elephant("Dumbo", 10), Parrot("Polly", 2)]
for animal in zoo:
    print(animal.make_sound())
```

</details>  


<br>


7. **Payment System (Polymorphism & Duck Typing)**

   * Create unrelated classes `CreditCard`, `PayPal`, and `CryptoWallet`.
   * Each should implement a method `pay(amount)` with different behaviours.
   * Write a function `process_payment(payment_method, amount)` that works with any object that has a `pay()` method.

<details>
<summary>Hint</summary>

* Each class needs a `pay()` method.
* In the function, call `payment_method.pay(amount)`.

</details>

<details>
<summary>Solution</summary>

```python
class CreditCard:
    def pay(self, amount):
        return f"Paid {amount} using Credit Card."


class PayPal:
    def pay(self, amount):
        return f"Paid {amount} using PayPal."


class CryptoWallet:
    def pay(self, amount):
        return f"Paid {amount} using Crypto Wallet."


def process_payment(payment_method, amount):
    print(payment_method.pay(amount))


methods = [CreditCard(), PayPal(), CryptoWallet()]
for m in methods:
    process_payment(m, 100)
```

</details>  


<br>