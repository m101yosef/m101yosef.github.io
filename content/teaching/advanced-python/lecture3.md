---
title: "3. Functional programming"
date: 2025-08-09
weight: 3
type: docs
tags: 
- Python
---

In the past two lectures, we wrote most of our code in procedural programming (our code was a sequence of instructions), we also test the speed and memory usage as our ways to measure code performance, but we didn't say anything about scalability. Today, we will write more scalable, reusable, testable, and predictable code.


## What makes a good function?
First, I want to say the obvious thing which is the name 'function' came from mathematics where a function is used to do some operations on a given input x like $f(x) = x + 1$ or even complex operations like $f(x) = \frac{\sin\left(x^{2}\right) + \log\left(x + 1\right)}{\sqrt{x^{2} + 1}}$. So, how can we know if the function is good (for the sake of coding). If you give it a thought, you will probably say, a good function that does one thing clearly with a descriptive name. That's true, and I will add more factors like the clearness of inputs and outputs as well as the ability to test and predict its mechanism. 


```python
# Complex function: does too many things
def process_user_data(name, age):
    # Check if name and age are valid
    if not name or age < 0:
        print("Invalid data!")
        return None
    
    # Capitalise the first letter of each word
    name = name.title()
    
    # Pretend to save to a database
    print(f"Saving {name}, {age} to the database...")
    
    return {"name": name, "age": age}
```

While this is a very valid function and you can use it but the thing is you are risking a big part of process (or the full process) to a single function so when the function goes down, it will take your process with it and your code will have nothing left to do. As a solution, we need to separate the big function into small functions. 

```python
# Good, separate functions
def is_valid_user(name, age):
    return bool(name) and age >= 0

def format_name(name):
    return name.title()

def save_user(name, age):
    print(f"Saving {name}, {age} to the database...")

# Example usage
name = "alice"
age = 25

if is_valid_user(name, age):
    nice_name = format_name(name)
    save_user(nice_name, age)
    print({"name": nice_name, "age": age})
else:
    print("Invalid data!")

```

When I first worked with reinforcement learning and model training with Gymnasium, the function usually returns more than one thing (e.g. agent state, reward, bools, other info). With no doubt they aren't the first coders who make a function returns more than one value but this was my start. Now, enough talking and let's see that in code.

```python
def get_name_parts(full_name):
    parts = full_name.split()
    return parts[0], " ".join(parts[1:])

first, last = get_name_parts("Mohamed Yosef")
print(first)  # Output: Mohamed
print(last)   # Output: Yosef
```

This gives you the control over what to do with outcomes (like in my case with reinforcement learning agents). 


## Flexible functions with `*args` and `**kwargs`
During my time at university, one of the professors who was teaching us the foundations of software engineering (and for some reason the cs department, made him teach the topic in Python). So, the professor was like Python is too silly to do software and he gave an example of the need to sum more than one number together with knowing how many number you will add. He was partially right; this is impossible unless we used `*args`. 

```python
# -----------------------------------------
# Goal: sum unknown number of numbers together
# - You should not use lists or built-in functions 
# -----------------------------------------

# Basic function
def sum_numbers(num1, num2, num3=0, num4=0): 
    """Summing up to four numbers
    - I used 0 to get some flexibility
    - While it is doable to add more than 4 in the inputs when building the function, I will be repeating my self
    """
    return num1 + num2 + num3 + num4

# Effective way
def sum_numbers(*args):  
    """Now you can sum infinite number of numbers"""
    total = 0
    for number in args: 
        total += number
    return total

# usage 
print(sum_numbers(5, 10, 15, 20))  # 50
``` 

Another useful way in the Python function toolkit is the use of `**kwargs` (short of 'keyword arguments') which gathers any extra keyword arguments into a dictionary. It is like an order form where you can add any extra requests you want, like `extra_cheese=True` or `no_onions=True`. The restaurant knows hwo to handle the common items, but the `**kwargs` lets them handle any custom requests. 

```python
# -----------------------------------------
# Goal: function to place an order at a restaurant
# - It takes a required item and size
# - Allows the users to add any number of custom requests
# -----------------------------------------

def place_order(item, size, **custom_requests):
    """
    Simulates a restaurant order system.

    Args:
        item (str): The main item being ordered (e.g., 'Pizza').
        size (str): The size of the item (e.g., 'Large').
        **custom_requests: A dictionary of any additional requests.
                          (e.g., extra_cheese=True, no_onions=True)
    """

    # Start with the basic order
    order = {
        "main_item": item,
        "size": size
    }

    print(f"Placing order for a {order['size']} {order['main_item']}...")

    # Now, check for and add any custom requests from **kwargs.
    # The 'custom_requests' variable is a dictionary that holds all the extra key=value pairs.
    if custom_requests:
        print("Adding custom requests:")
        for request, value in custom_requests.items():
            # Add the custom request to the order dictionary
            order[request] = value
            print(f"  - {request}: {value}")
    else:
        print("No custom requests added.")

    print("\n--- Final Order Summary ---")
    # Print the entire final order dictionary
    for key, value in order.items():
        print(f"  {key.replace('_', ' ').title()}: {value}")
    print("---------------------------\n")


# --- Example Usage ---

# 1. A simple order with no custom requests
place_order("Pizza", "Medium")

# 2. An order with extra toppings and a special instruction
place_order("Burger", "Large", no_pickles=True, cook_temp="Medium Rare")

# 3. An order for a drink with a simple modification
place_order("Coffee", "Grande", extra_shot=True)

```

## Higher-order functions 

Modularity is the key to successful programming, and functional languages provide the two most powerful kinds of glue we have—higher-order functions and lazy evaluation ([John Hughes, 1989](#hughes_1989)).


In Python, functions are "first-class objects' meaning you can treat them like any other variable (like a number or a string). You can pass them around, store them in lists, and return them from other functions. And that is the case with higher-order functions where it does at least one of the two things: (1) takes another function as an input. (2) returns a function as an output. 

### Functions as inputs 
When we used `*args` and `**kwargs`, we saw a new world of flexibility. You will see how to make your code more flexible. Instead of writing separate functions for every single task, you can write one function that takes the 'task' as aa parameter. 

```python
def double(x): 
    return x * 2

def square(x): 
    return x * x

def process_numbers(numbers, action_function): 
    return [action_function(x) for x in numbers]

print(
    "Double numbers: ", 
    process_numbers([1, 2], double), 
    sep="\n"
)

```

Here, we add scalability. Someone else can take my code and write a small function for do other operation (like divide the number by 2) and pass it through our `process_numbers` function. Isn't it cool!


### Functions as outputs 
You can also, create functions that build and return new functions. These are often called 'function factories'. I wasn't a fun of these kind of functions at all until I saw the following example which slightly changed my opinion and made me feel like these functions can save me from repeating the code. 

```python
# 1) Without functions as output
def prefix(pre, text):
    return f"{pre}{text}"

print(
    "Without functions as output:", 
    prefix("[ERROR] ", "File not found"), 
    prefix("[ERROR] ", "Disk full"), 
    prefix("[INFO] ", "Process completed"),
    sep="\n"
)


# 2) With functions as output (closure)
def make_prefixer(pre):
    def add_prefix(text):
        return f"{pre}{text}"
    return add_prefix

error_prefix = make_prefixer("[ERROR] ")
info_prefix = make_prefixer("[INFO] ")

print(
    "\nWith functions as output:", 
    error_prefix("File not found"), 
    error_prefix("Disk full"), 
    info_prefix("Process completed"), 
    sep="\n"
)
```

Since, I'm not that convinced with using function factories, I did some research and designed the following [flowchart](#fig:function-factories-flowchart) to help in determining if using function factories is helpful or not.


<figure id="fig:function-factories-flowchart">
  <img src="../images/function-factories-flowchart.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>-</figcaption>
</figure> 


### Built-in higher-order functions
As we reached the end of our lecture, we want to build and explore some of the higher-order functions that Python provides us with.  

1. `map(function, iterable)`: applied a given function to each item in the iterable and returns a map object (an iterable). Use it when you need to apply pure transformation (no side effects).
```python
map(str.upper, ["cat", "dog", "fish"])  
```
```
['CAT', 'DOG', 'FISH']
```

**NOTE:** 'no side effects' means that the function operates only on the inputs without altering anything else on your code or the program's behaviour. 


2. `filter(function, iterable)`: keeps only the items form an iterable for which the function returns `True`. Use it when using inline `if` in a comprehension might hurt readability. 
```python
filter(lambda x: x > 0, [-5, 3, 0, 7])  # -> [3, 7]

```

3. `sorted(iterable, key=None, reverse=False)`: returns a new sorted list from the items of an iterable. The best use case here is when you use `key` for sorting gby attributes, computed values, or nested data. Also, use it when you don't want to modify the original list unlike `list.sort()` which modifies the original. 
```python
sorted(["pear", "banana", "apple"], key=len)  
```
```
['pear', 'apple', 'banana']
```

4. `any(iterable)` & `all(iterable)`: returns `True` if any/all elements is/are truthy. Best use when validating multiple conditions without writing loops. 
```python
any(x > 0 for x in [-2, 0, 3])  # -> True
all(len(name) > 3 for name in ["John", "Mary"])  # -> True
```

5. `max(iterable, key=None)` & `min(iterable, key=None)`: return the largest/smallest item according to a key function. Effective for selecting max/min based on computed criteria. 
```python
max(["apple", "banana", "pear"], key=len)  # -> 'banana'
```

## Exercises
1. Write a function `sum_positive()` that takes any number of positional arguments and returns the sum of positive numbers only. 

2. Write a function `apply_twice(func, value)` that applied a given function twice. For example if the `func` is squared and the value is 4 then it will square 4 twice and the result will be $(4^2)^2=64$

3. Given `nums = [1, 2, 3, 4]` 
    - use map to return their squares
    - use filter to only keep odd numbers

4. Given `fruits = ["apple", "banana", "cherry", "date", "kiwi", "grape"]` Sort the list alphabetically by the last letter of each word using the `key` parameter of `sorted()`. Expected output: `['banana', 'apple', 'grape', 'date', 'kiwi', 'cherry']`



## Additional Reading
[<span id="hughes_1989">1</span>] John Hughes. (1989). Why Functional Programming Matters. The Computer Journal, 32(2), 98–107. https://doi.org/10.1093/comjnl/32.2.98  <br>