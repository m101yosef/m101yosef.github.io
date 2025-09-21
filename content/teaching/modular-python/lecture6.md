---
title: "6. Type hinting"
date: 2025-08-25
weight: 6
type: docs
tags: 
- Python
---

Throughout our journey so far, we can build complex, functional systems. Yet, as our projects grow in scale and complexity, a subtle but persistent challenge emerges: the problem of trust. 

Consider a function signature like `def process_data(data): `. When you encounter this in a large codebase, what is `data`? Is it a list of numbers? A dictionary of user records from a database? A raw string from a web request? 

Python, by default, is dynamically typed, meaning variables do not need an explicit type declaration. Despite the flexibility of dynamic typing, it makes the code prone to runtime errors. That’s why I came with this lecture today to look together for a solution to help us improve reliability.

## Type hinting
It's a way to give a hint to the computer about the data type that we expect to have for variables, functions, parameters, and return values. I should clearly tell you that type hinting does not change runtime behaviour&mdash;you will not get a direct error message if you entered the wrong type, but maybe a warning. Anyway, it help coders and tools like `mypy` catch mistakes earlier.

For example, the following function seems straightforward, but its contract is dangerously implicit. Take a moment and guess what is the expected type for `excited`? A boolean? An integer? A string? 

```python
def create_greeting(name, excited):
    greeting = f"Hello, {name}"
    if excited:
        greeting = greeting + "!"
    return greeting
```
Due to the fact that Python is dynamically type as I've just told you, the code will "work" for many inputs, but not always as intended. While `create_greeting("Mohamed", True)` behaves as expected, `create_greeting("Yosef", 1)` also works because `if 1:` evaluates to `True`. Meanwhile `create_greeting("Faiz", "yes")`also works but `create_greeting("Ibrahim", 0)` produces a result that might surprise the caller. The function's behaviour is un predictable because its inputs are not clearly defined.  

### Explicit is better than implicit 
Introduced formally in [PEP 484](https://peps.python.org/pep-0484/), type hinting provides a standard syntax for annotating the expected types of variables, function parameters, and return values. I don't know if you know but this is a direct application of a core tenet from [the Zen of Python](https://peps.python.org/pep-0020/): "Explicit is better than implicit". 

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
# The function's "contract" is now explicit and clear.
# It accepts a string and a boolean, and guarantees it will return a string.
def create_greeting(name: str, excited: bool) -> str:
    greeting = f"Hello, {name}"
    if excited:
        greeting = greeting + "!"
    return greeting

print(greet(name="Mohamed", excited=True))
```
```
Hello, Mohamed!
```
- `name: str` & `period: str` $\to$ parameters must be string
- `-> str` $to$ return value must be a string

However, if you call `greet(123, "yes")`, Python (by default) will not throw an error at runtime, but tools like `mypy` will flag it. 


<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> Annotating a user profile function
</div>

You have been given a function that generates a summary string for a user profile. Your task is to add the correct basic type hints for its parameters and its return value.

```python
# Add type hints to this function
def format_user_summary(username, age, is_active):
    status = "Active" if is_active else "Inactive"
    return f"User: {username}, Age: {age}, Status: {status}"
```

**Instructions**
1. Examine the function `format_user_summary`.
2. Identify the expected data type for `username`, `age`, and `is_active` based on their usage.
3. Determine the data type of the value the function returns.
4. Add the appropriate annotations to the function signature.

<details>
<summary>hint</summary>

Think about what types are commonly used for names, ages, and flags that represent a true/false state. The f-string at the end combines everything into a single data type.

</details>

<details>
<summary>solution</summary>

```python
def format_user_summary(username: str, age: int, is_active: bool) -> str:
    status = "Active" if is_active else "Inactive"
    return f"User: {username}, Age: {age}, Status: {status}"
```

</details>
</div>

### Advanced type hinting
You can also apply type hinting to sequences with a more flexible way like determining the type of the data that a given sequence can contain. 
```python
# ----- Option 1 --------
names: list[str] = ["Mohamed", "Yosef"]
quantity: dict[str, int] = {"camera": 7, "lens": 18}
origin: tuple[int, int] = (0,0)

# ------ Option 2 --------
from typing import List, Dict, Tuple

names: List[str] = ["Mohamed", "Yosef"]
quantity: Dict[str, int] = {"camera": 7, "lens": 18}
origin: Tuple[int, int] = (0,0)
```
While built in generics in `option 1` are a bit faster at runtime because they don't involve extra typing machinery, I introduced `typing` module since we will need it later (so you can say it is for the learning purpose).

<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> Annotating a data processing function
</div>

Below is a function that processes a list of student records, where each record is a dictionary. It finds and returns the name of the student with the highest score. Add the correct type hints for the complex `student_data` parameter and the function's return value.

**Instructions**
1. Analyse the structure of `student_data`. It's a list, but what does each element of the list contain?
2. Examine the structure of the dictionaries inside the list. What are the key types and value types? Note that the values are of mixed types.
3. Consider the return value. What happens if the input list is empty? What is the type of the student's name? Use the pipe `|` operator to indicate that the function can return one of two types.
4. Construct the full type hint for the parameter and the return value.

```python
# Add type hints to this function
def get_top_performer(student_data):
    if not student_data:
        return None

    top_student = max(student_data, key=lambda student: student["score"])
    return top_student["name"]
```

<details>
<summary>hint</summary>

The parameter `student_data` is a list of dictionaries. The dictionaries have `str` keys, but the values can be either a `str` (for the name) or an `int` (for the score). The function can return either a `str` or `None`.

</details>

<details>
<summary>solution</summary>

```python
# Note: We will learn a better way to handle the 'None' return case shortly.
# For now, this is a valid, if incomplete, annotation.
def get_top_performer(student_data: list[dict[str, str | int]]) -> str | None:
    if not student_data:
        return None

    top_student = max(student_data, key=lambda student: student["score"])
    return top_student["name"]
```

</details>
</div>

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

We also have `TypeAlias` that is effective when type hints become long and complex (e.g., `dict[str, list[tuple[int, str]]]`), this can harm readability. So, with the help of `TypeAlias` you will be able to create a simple, descriptive name for a complex type signature, making your code cleaner and more maintainable. Additionally, there is `Any`, the easy one, that you can use whenever a value could be any type. Yes, just as simple as that.


```python
from typing import Union, Optional, Any, TypeAlias

# Using a TypeAlias to create a clear, reusable name for a complex type.
# This indicates a user ID can be either an integer or a string.
UserID: TypeAlias = int | str  # Modern syntax for Union[int, str]

# This function can find a user by either a numeric ID or a username.
# Its return value is a dictionary where values can be of any type.
def find_user_data(user_id: UserID) -> dict[str, Any]:
    # In a real application, this would query a database.
    print(f"Searching for user: {user_id}")
    if isinstance(user_id, int) and user_id == 1:
        return {"id": 1, "username": "alice", "roles": ["admin", "editor"], "active": True}
    # For demonstration, we return a dictionary with mixed-type values.
    return {"id": user_id, "data": {}}

# This function might not find a user's email, so the return type is Optional[str].
# This clearly communicates to the caller that they must handle the 'None' case.
def get_user_email(user_id: UserID) -> Optional[str]:
    # Let's imagine only user '1' has an email.
    if user_id == 1:
        return "alice@example.com"
    return None # Explicitly return None if no email is found.
```


<div class="exercise">
<div id="practical-exercise-3" class="exercise-head">
<b>Practical exercise 3:</b> Refactoring with advanced types
</div>

You are given a function that processes a batch of jobs. The input can be a single job ID (as an `int`) or a list of many job IDs (`list[int]`). The current function signature is not type-hinted. Your task is to refactor it using a `TypeAlias` and a `Union` to accurately describe its input parameter. 

```python
# Refactor this function signature with advanced type hints
def process_jobs(job_ids):
    if isinstance(job_ids, int):
        # If it's a single int, wrap it in a list to process uniformly
        job_ids = [job_ids]
    
    for job_id in job_ids:
        print(f"Processing job #{job_id}...")
    
    return len(job_ids)
```

**Instructions**
1. Import `TypeAlias` from the `typing` module.
2. Define a new `TypeAlias` named `JobInput` that represents the two possible input types: a single `int` or a list of integers.
3. Update the function signature of `process_jobs` to use your new `JobInput` alias for the `job_ids` parameter.
4. Add the correct return type hint to the function.

<details>
<summary>hint</summary>

The complex input type can be described as `int | list[int]`. Create a `TypeAlias` to give this combination a simpler name. The function returns the number of jobs processed, which will always be an integer.

</details>

<details>
<summary>solution</summary>

```python
from typing import TypeAlias

# 1. Create a TypeAlias for the complex input type.
JobInput: TypeAlias = int | list[int]

# 2. Use the alias to annotate the function parameter and add the return type.
def process_jobs(job_ids: JobInput) -> int:
    # The logic remains the same, but the contract is now clear.
    if isinstance(job_ids, int):
        job_ids = [job_ids]
    
    for job_id in job_ids:
        print(f"Processing job #{job_id}...")
    
    return len(job_ids)

# Example calls
process_jobs(101)
process_jobs([201, 202, 203])
```

</details>
</div>


## Static typing 
I mentioned earlier that Python typing is not static and the way to make it static is by using a tool like `mypy`. So, it's time to use `mypy` to check our code. But before going any further, make sure you have `mypy` installed: 

```bash
pip install mypy
```

Now, let's build the file using context manager that we have learned in [lecture 4](https://m101yosef.github.io/teaching/modular-python/lecture5). 

```python
code = """
def get_name_length(name: str) -> int:
    # This function expects a string and returns its length.
    return len(name)

# This function call is correct and will pass type checking.
print(get_name_length("Alice"))

# This line contains a type error! We are passing an integer, not a string.
# A standard Python run would execute the first print, then crash with a TypeError here.
# Mypy will find this error without running any of the code.
print(get_name_length(123))
"""

with open('function.py', 'w') as f: 
    f.write(code)
```

As a final step, go back to the terminal and run the following command: 
```bash
mypy function.py
```
```
$ mypy mypy_demo.py
mypy_demo.py:10: error: Argument 1 to "get_name_length" has incompatible type "int"; expected "str"  [arg-type]
Found 1 error in 1 file (checked 1 source file)
```

It will be great if you compared the results of `mypy function.py` with the result of `python function.py` 


<div class="exercise">
<div id="practical-exercise-4" class="exercise-head">
<b>Practical exercise 4:</b> Bug hunting
</div>

The script below contains a subtle bug. It calculates the total price of items in a shopping cart, but there's a mistake in how the final price is calculated. The script might run without crashing under some conditions, but the logic is flawed. Your task is to add type hints to the functions and then use `mypy` to find and fix the bug that a simple visual inspection might miss.

```python
# Original buggy code
def calculate_item_total(price, quantity):
    return price * quantity

def get_cart_total(cart_items):
    total_price = 0
    for item in cart_items:
        # The 'price' is a float, but 'quantity' is an integer.
        total_price += calculate_item_total(item["price"], item["quantity"])
    
    # BUG: A string discount code is being subtracted from a numeric total!
    discount_code = "SAVE10"
    final_price = total_price - discount_code
    
    return final_price

cart = [
    {"name": "apple", "price": 0.5, "quantity": 4},
    {"name": "banana", "price": 0.25, "quantity": 6}
]

print(f"Final price: {get_cart_total(cart)}")
```

**Instructions**
1. Save the buggy code into a file named `cart_checker.py`.
2. Add appropriate type hints to both `calculate_item_total` and `get_cart_total` functions. Pay close attention to the `cart_items` structure and the types of the variables involved in calculations.
3. Run `mypy cart_checker.py` in your terminal.
4. Analyse the error message from `mypy`. It should point directly to the logical flaw.
5. Fix the bug in the code and run `mypy` again to confirm the fix.


<details>
<summary>hint</summary>

The core bug is an impossible mathematical operation. Make sure to annotate all variables, including `total_price` and `discount_code`, to give `mypy` the most information possible.

</details>

<details>
<summary>solution</summary>

First, add the type hints: 
```python
# file: cart_checker.py
def calculate_item_total(price: float, quantity: int) -> float:
    return price * quantity

def get_cart_total(cart_items: list[dict[str, str | float | int]]) -> float:
    total_price: float = 0.0
    for item in cart_items:
        # Mypy can infer that item["price"] and item["quantity"] might not be the right types
        # but the biggest error is below.
        price = item.get("price", 0.0)
        quantity = item.get("quantity", 0)
        if isinstance(price, float) and isinstance(quantity, int):
             total_price += calculate_item_total(price, quantity)
    
    discount_code: str = "SAVE10"
    # This is the line where mypy will report a clear error
    final_price = total_price - discount_code
    
    return final_price

cart = [
    {"name": "apple", "price": 0.5, "quantity": 4},
    {"name": "banana", "price": 0.25, "quantity": 6}
]

print(f"Final price: {get_cart_total(cart)}")
```

Now, run `mypy`: 
```bash
$ mypy cart_checker.py
cart_checker.py:15: error: Unsupported operand types for - ("float" and "str")  [operator]
Found 1 error in 1 file (checked 1 source file)
```

`mypy` instantly identifies the logical impossibility of subtracting a string (`discount_code`) from a float (`total_price`). The fix would involve correctly parsing the discount from the string or removing the line entirely. 

</details>
</div>


