---
title: "5. Type hinting"
date: 2025-08-20
weight: 5
type: docs
tags: 
- Python
---

Python, by default, is dynamically typed, meaning variables do not need an explicit type declaration. Despite the flexibility of dynamic typing, it makes the code prone to runtime errors. That's why I came with this lecture today to look together for a solution to help us improve reliability. 


## Type hinting
It's a way to give a hint to the computer about the data type that we expect to have for variables, functions, parameters, and return values. I should clearly tell you that type hinting does not change runtime behaviour&mdash;you will not get a direct error message if you entered the wrong type, but maybe a warning. Anyway, it help coders and tools like `mypy` catch mistakes earlier.

### Basic type hinting
For primitive data types, you only need to say the type like the following: 
```python
# Basic 
item: str = "camera"
serial: int = 707
price: float = 20.8
available: bool = True 

# Built-in sequences
numbers: list = [1, 2, 3]
person: dict = {"name": "Mohamed", "country": "Egypt"}
coords: tuple = (0, 0)
```

```python
def greet(name: str, period: str) -> str: 
    return f"Good {period}, {name}!"

print(greet(name="Mohamed", period="morning"))
```
```
Good morning, Mohamed!
```
- `name: str` & `period: str` $\to$ parameters must be string
- `-> str` $to$ return value must be a string

However, if you call `greet(123, "afternoon")`, Python (by default) will not throw an error at runtime, but tools like `mypy` will flag it. 

### Advanced type hinting
You can also apply type hinting to sequences with a more flexible way like determining the type of the data that a given sequence can contain. 
```python
from typing import List, Dict, Tuple

names: List[str] = ["Mohamed", "Yosef"]
quantity: Dict[str, int] = {"camera": 7, "lens": 18}
origin: Tuple[int, int] = (0,0)
```

As you see, this is more efficient because it determines the sequence type and the data type within. But we still have more advance hints like `Union` which adds more flexibility to the table by allowing your data to hold more than one data type at once. Okay, let's clarify this by an example: 
```python
# Union in practice 
from typing import Union

# This variable can be either an integer or a sting 
my_variable: Union[int, str] = 10
my_variable = "hello"

def process_data(data: Union[int, float, str]) -> str: 
    """
    Processes an integer, float, or string 
    and returns a string.
    """
    if isinstance(data, (int, float)): 
        return f"The number is {data}"
    else: 
        return f"The string is '{data}'"

print(
    process_data(5), 
    process_data(3.14), 
    process_data("Python), 
    sep="\n"
)
```
`isinstance(object, classinfo)` is a built-in function that checks if an object belongs to a specific type (or class)
- `True` $\to$ if the object is an instance (or subclass instance) of the given class
- `False` $\to$ otherwise 

```python
x = 5
print(
    isinstance(x, int),   # True
    isinstance(x, str),   # False 
    sep="\n"
)
```

Another advanced hint is `Optional` which allows you to leave it as `None`.

```python
# Optional idea
last_name: Optional[str] = None
```
Same like what we did with `Union`, let's clarify `Optional` with a practical example...

```python
# Optional in practice 
from typing import Optional 

def get_username(user_id: int) -> Optional[str]: 
    """
    Returns a username if the user_id is valid, 
    otherwise returns None
    """
    if user_id == 123: 
        return "JaneDoe"
    return None

# Example usage 
if username is not None: 
    print(f"Username found: {username}")
else: 
    print("User not found")
```

## Static typing 
I mentioned earlier that Python typing is not static and the way to make it static is by using a tool like `mypy`. So, it's time to use `mypy` to check our code. But before going any further, make sure you have `mypy` installed: 

```bash
pip install mypy
```

Now, let's build the file using context manager that we have learned in [lecture 4](https://m101yosef.github.io/teaching/advanced-python/lecture4). 

```python
code = """
def add(x: int, y: int) -> int:
    return x + y

print(add(5, "hello")) 
"""

with open('function.py', 'w') as f: 
    f.write(code)
```

As a final step, go back to the terminal and run the following command: 
```bash
mypy function.py
```

It will be great if you compared the results of `mypy function.py` with the result of `python function.py` 


To wrap up what we have learned in this section, you have used `mypy` to tweak the default behaviour of Python from dynamic typing to static typing which gives us the ability to catch errors early (before runtime), improve readability and documentation, makes IDEs smarter (autocomplete, suggestion), and, most importantly, useful in large projects or when working in teams. 


## Exercises 

1. Write a function `find_max` that takes a list of integers and returns the maximum integer. And don't forget to add type hints as well. 

2. Write a function `square` that takes an integer and returns its square. Store it within a file called `square.py `. Then, run `mypy` on it with both correct and incorrect inputs and write down your observations. 