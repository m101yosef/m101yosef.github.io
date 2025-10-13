---
title: "4. Functional Programming"
date: 2025-08-15
weight: 4
type: docs
tags: 
- Python
---

As I promised, we will for sure take about the thinking process not only the syntax choices and here I'm to live up to this promise. First of all, many python coder consider functional programming as the number two programming paradigm that comes object-oriented programming. By the way, "paradigm" represents a way of thinking about how problems are framed and solutions are expressed. 

Throughout the history of Python, different paradigms have shaped how programmers design algorithms, reason about complexity, and manage computational resources. And up till now, almost all Python programmers agreed that functional programming along side with OOP together makes the most use of Python.

However, we do need to listen to this disclaimer: 
<br><span style="color: crimson;">!! PYTHON IS NOT PURELY FUNCTIONAL LANGUAGE !!</span>

The Python model relies on high-level representation of multiple paradigms; procedural, functional, object-oriented. So, we are not seeking purity in Python. Instead, we borrow functional concepts (such as higher-order functions, immutability practices, and comprehensions) to enhance code quality. 


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


## Flexible functions with arguments
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
    - But this is limited due to the number of inputs
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

<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> The Monolithic Monster 
</div>

Below is a function `process_and_print_data` that takes a list of user dictionaries, filters them by country, formats the names, and prints a report. It's rigid and violates the single responsibility principle. Your task is to refactor this "monster" into a more modular and useful set of tools.

```python
user_data = [
    {'name': 'ali hassan', 'country': 'Egypt', 'age': 29},
    {'name': 'Jane Smith', 'country': 'USA', 'age': 42},
    {'name': 'mohamed yosef', 'country': 'Egypt', 'age': 22},
]

def process_and_print_data(data):
    """Filters for users from Egypt, formats their names, and prints a report."""
    print("--- User Report: Egypt ---")
    
    egyptian_users = []
    for user in data:
        if user['country'] == 'Egypt':
            user['name'] = user['name'].title() # Format the name
            egyptian_users.append(user)
    
    for user in egyptian_users:
        print(f"- {user['name']}, Age: {user['age']}")

process_and_print_data(user_data)
```

**Refactoring instructions**: 
1. Create a `filter_by_country` function that should the data list and a `country_name` as arguments and return a new list containing only the users from that country. 
2. Create a `format_user_names` function that take a list of users and return a new list where each user's name has been properly capitalised using `.title()`.
3. Create a flexible `generator_report` function that accept a list of users and use `*args` to accept a variable number of `report_fields` to print (e.g., 'name', 'age', 'country'). It should print a clean report. 
4. Rewrite the main script to use your new functions to generate the same report for "Egypt" showing the 'name' and 'age'. 


<details>
<summary>hint</summary>

Think about the flow of data. The output of one function should become the input for the next. For the `generate_report` function, how can you use `*args` to loop through the desired dictionary keys?

</details>

<details>
<summary>solution</summary>

```python
user_data = [
    {'name': 'ali hassan', 'country': 'Egypt', 'age': 29},
    {'name': 'Jane Smith', 'country': 'USA', 'age': 42},
    {'name': 'mohamed yosef', 'country': 'Egypt', 'age': 22},
]

def filter_by_country(data, country_name):
    """Filters a list of user dicts by a specific country."""
    return [user for user in data if user['country'] == country_name]

def format_user_names(data):
    """Takes a list of users and returns a new list with names title-cased."""
    # We must create a copy to avoid modifying the original data (immutability).
    formatted_data = [user.copy() for user in data] 
    for user in formatted_data:
        user['name'] = user['name'].title()
    return formatted_data

def generate_report(data, *report_fields):
    """Prints a report from the user data for the specified fields."""
    for user in data:
        # Build a list of "field: value" strings for the requested fields
        report_line_parts = [f"{field.title()}: {user.get(field, 'N/A')}" for field in report_fields]
        print(f"- {', '.join(report_line_parts)}")

# --- Main Script ---
# Now we compose our functions to achieve the goal.
egypt_users = filter_by_country(user_data, 'Egypt')
formatted_users = format_user_names(egypt_users)

print("--- User Report: Egypt ---")
generate_report(formatted_users, 'name', 'age')

# We can now easily generate a different report!
print("\n--- User Report: USA ---")
usa_users = filter_by_country(user_data, 'USA')
generate_report(usa_users, 'name', 'country')
```

</details>
</div>

## The three tenets of functional programming

### Purity
You can think of pure functions that same way to think of pure people; they are always treating others in the same nice way despite the surrounding with completely ignorance of the external changes, they can keep themselves calm because they rely on themselves from inside. 

Programmatically speaking, a pure function always produces the same output given the same input. This property mirrors mathematics functions such as $f(x) = x^2$, where the evaluation of $f(2)$ is always $4$. Additionally, it follows the rule of "no side effects" which means that the function does not alter external state or perform observable actions such as modifying global variables, mutating inputs, or performing input/output (I/O) operations like printing to the console or writing to a file. 

```python
# Pure function
def add(a, b):
    return a + b

print(add(2, 3))  # Always 5

# Impure function
global_list = []

def add_and_store(a, b):
    result = a + b
    global_list.append(result)  # modifies external state
    print(result)               # performs I/O (side effect)
    return result
```

The first function, `add`, is pure: it returns the same result for the same inputs, and it does not depend on or modify external state. The second function, `add_and_store`, is impure because it appends to a global variable and produces console output.

Pure functions are easier to deal with since they are predictable and testable because their behaviour is entirely determined by their inputs. Pure functions can be reasoned about mathematically, tested in isolation, and safely reused in different contexts. 

### Immutability
simply an object that can not be changed after it has been created. So, rather than altering existing structures, programmers construct new once. For instance, instead of calling `list.append`, one might create a new list that includes the additional element. 

```python
numbers = [1, 2, 3]
new_numbers = numbers + [4]
```

Why? Immutability reduces complexity by eliminating bugs related to unexpected state changes. It ensures that once an object is created, its value is reliable for its entire lifetime. 


### Higher-order functions 

Modularity is the key to successful programming, and functional languages provide the two most powerful kinds of glue we have—higher-order functions and lazy evaluation ([John Hughes, 1989](#hughes_1989)).


In Python, functions are "first-class objects' meaning you can treat them like any other variable (like a number or a string). You can pass them around, store them in lists, and return them from other functions. And that is the case with higher-order functions where it does at least one of the two things: (1) takes another function as an input. (2) returns a function as an output. 

#### Functions as inputs 
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


<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> The state corrupter
</div>

The `apply_discount` function below modifies the original `shopping_cart` list directly. This is a "side effect" and makes the function impure. Rewrite it to be a pure function that does not change the original list but instead returns a new list with the discounted prices.

```python
shopping_cart = [
    {'item': 'Laptop', 'price': 4000},
    {'item': 'Mouse', 'price': 150},
    {'item': 'Keyboard', 'price': 250},
]

def apply_discount(cart, discount_percentage):
    """Applies a discount to each item's price in the cart."""
    for item in cart:
        discount_amount = item['price'] * (discount_percentage / 100)
        item['price'] -= discount_amount # This is a side effect! It modifies the original.

print(f"Original cart (before): {shopping_cart}")
apply_discount(shopping_cart, 10) # 10% discount
print(f"Original cart (after): {shopping_cart}") # The original has been mutated!
```


<details>
<summary>hint</summary>

Your new function should start by creating a new, empty list. Then, iterate over the original cart, but for each item, create a copy of it, apply the discount to the copy, and append the copy to your new list.

</details>

<details>
<summary>solution</summary>

```python
shopping_cart = [
    {'item': 'Laptop', 'price': 4000},
    {'item': 'Mouse', 'price': 150},
    {'item': 'Keyboard', 'price': 250},
]

def get_discounted_cart(cart, discount_percentage):
    """
    Calculates discounted prices and returns a NEW cart without modifying the original.
    This is a pure function.
    """
    new_cart = []
    for item in cart:
        item_copy = item.copy() # Create a shallow copy of the dictionary
        discount_amount = item_copy['price'] * (discount_percentage / 100)
        item_copy['price'] -= discount_amount
        new_cart.append(item_copy)
    return new_cart

print(f"Original cart (before): {shopping_cart}")
discounted_cart = get_discounted_cart(shopping_cart, 10)
print(f"Discounted cart: {discounted_cart}")
print(f"Original cart (after): {shopping_cart}") # Unchanged!
```

</details>
</div>


#### Functions as outputs 
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


<div class="exercise">
<div id="practical-exercise-#" class="exercise-head">
<b>Practical exercise 3:</b> The function factory
</div>

Write a "factory" function called `create_validator`. This function will take a `min_value` and a `max_value` as arguments. It will then return a new function. This returned function (let's call it the "validator") should take a single number as an argument and return `True` if the number is within the `min_value` and `max_value` range (inclusive) and `False` otherwise.

1. Define `create_validator(min_value, max_value)`.
2. Inside it, define a nested function, `is_valid(number)`.
3. The `is_valid` function should contain the logic for checking the range.
4. `create_validator` should return the `is_valid` function.
5. Create two validators: `validate_age` (for ages 18-99) and `validate_score` (for scores 0-100).
6. Test both of your new validator functions with some numbers.


<details>
<summary>hint</summary>

The nested function will have access to `min_value` and `max_value` from its parent's scope, even after the parent function has finished executing. This is the principle of a closure.

</details>

<details>
<summary>solution</summary>

```python
def create_validator(min_value, max_value):
    """A higher-order function that returns a validation function."""
    def is_valid(number):
        """Checks if a number is within the pre-defined min/max range."""
        return min_value <= number <= max_value
    
    return is_valid

# 1. Create specific validator functions from our factory
validate_age = create_validator(18, 99)
validate_score = create_validator(0, 100)

# 2. Use the generated functions
print(f"Is 25 a valid age? {validate_age(25)}")   # True
print(f"Is 15 a valid age? {validate_age(15)}")   # False

print(f"Is 88 a valid score? {validate_score(88)}") # True
print(f"Is 101 a valid score? {validate_score(101)}") # False

# You can see that validate_age and validate_score are actual functions
print(type(validate_age)) # <class 'function'>
```

</details>
</div>


#### Built-in higher-order functions
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

<div class="exercise">
<div id="practical-exercise-4" class="exercise-head">
<b>Practical exercise 4:</b> The data transformer
</div>

You have a list of sensor reading dictionaries. Your goal is to generate a list of all the temperature readings in Celsius from sensors that are marked as 'active'. Note: The temperatures are given in Kelvin.

**Conversion formula**: Celsius = Kelvin - 273.15 

**Dataset**: 
```python
sensor_readings = [
    {'id': 'sensor_A', 'status': 'active', 'kelvin_temp': 301.15},
    {'id': 'sensor_B', 'status': 'inactive', 'kelvin_temp': 299.15},
    {'id': 'sensor_C', 'status': 'active', 'kelvin_temp': 310.55},
    {'id': 'sensor_D', 'status': 'active', 'kelvin_temp': 295.15},
]
```

**Instructions**: 
1. **Functional approach**: 
    - Use the filter() function with a lambda to get a new iterable containing only the 'active' sensors.
    - Use the map() function with a lambda to take the result from filter() and transform each sensor's Kelvin temperature into Celsius.
    - Convert the final map object into a list and print it.
2. **List comprehension approach** 
    - Achieve the exact same result in a single line using a list comprehension with an if clause.
3. **Analysis**: In a comment, briefly state which approach you find more readable and why. 

<details>
<summary>hint</summary>

For the functional approach, you will need to chain your calls. The output of `filter()` will be the input to `map()`. Remember that `map` and `filter` return iterators, not lists, so you'll need to wrap the final result in `list()`.

</details>

<details>
<summary>solution</summary>

```python
sensor_readings = [
    {'id': 'sensor_A', 'status': 'active', 'kelvin_temp': 301.15},
    {'id': 'sensor_B', 'status': 'inactive', 'kelvin_temp': 299.15},
    {'id': 'sensor_C', 'status': 'active', 'kelvin_temp': 310.55},
    {'id': 'sensor_D', 'status': 'active', 'kelvin_temp': 295.15},
]

# 1. Functional Approach using filter and map
active_sensors = filter(lambda s: s['status'] == 'active', sensor_readings)
celsius_temps_map = map(lambda s: round(s['kelvin_temp'] - 273.15, 2), active_sensors)
celsius_list_functional = list(celsius_temps_map)
print(f"Functional Approach Result: {celsius_list_functional}")

# 2. List Comprehension Approach
celsius_list_comprehension = [
    round(s['kelvin_temp'] - 273.15, 2) 
    for s in sensor_readings 
    if s['status'] == 'active'
]
print(f"List Comprehension Result: {celsius_list_comprehension}")

# 3. Analysis (This is a subjective answer, but a good one would be):
# The list comprehension is often considered more "Pythonic" and readable for
# simple transformations like this. The logic reads from left to right in a
# way that's similar to natural language ("take the temp for each sensor if it's active").
# The functional approach can be very powerful, especially with more complex functions,
# but can sometimes feel less direct for simple cases.
```

</details>
</div>





## Additional Reading
[<span id="hughes_1989">1</span>] John Hughes. (1989). Why Functional Programming Matters. The Computer Journal, 32(2), 98–107. https://doi.org/10.1093/comjnl/32.2.98  <br>