---
title: "1. Code format & performance"
date: 2025-08-07
weight: 1
type: docs
tags: 
- Python
---

As they say "What is more important than doing the work is organising it". So, what we aim to do today is to reach some level of simple, efficient, readable, and robust code. It is not another list of rules to memorise, it is how you share your thinking process with other coders. Also, a big part of your job as a coder is to share your ideas, contribute, or at least do your tasks within your team/company. 

## How we measure the good, the bad, and the ugly
During the time I was a UX designer, we used to categorise designs into one of these three categories; good, bad, and ugly. We, you and me, will do the same with code but first I have a story to tell you. Back in 2001, three Python coders (Guido van Rossum, Barry Warsaw, and Alyssa Coghlan) wrote a style guide for Python code titled "[PEP 8](#pep8)" which stands for Python Enhancement Proposal. By the way, this style guide still active today. I want to say here is like in the design where I used to categorise the work into three groups, we have some kind of the same approach here...

If you gave it a thought, you may ask "Why PEP 8?". Then, one of the PEP 8 authors, Guido van Rossum, has an answer for you; code is read much more often that it written. And for that reason, the guidelines provided in PEP 8 are intended to improve teh readability among Python coders.

**But still there is a more important question: how to measure the good, the bad, and the ugly? Is the style alone enough?**

Just like design, the code has two parts the look and the functionality. To understand how to write and measure the look of you code (aka. format), following the PEP 8 will be enough. However, if you want to go deeper and discover the functionality behind the code (aka. performance) you should follow the list I talked about earlier (simplicity, efficiency, readability, and robustness).

With no doubt reading the official [PEP 8](pep8) style guide will give more info but here I will try to give you the minimal needs for you to go and practice. 

### Code layout 
Again, in design, whitespace is not just something blank it is part of the art or maybe it is the most import part. What about enough taking and start coding...

 <figure id="fig:good-bad-ugly">
  <img src="../images/good-bad-ugly.png">
  <figcaption align="center" style="color: gray; "><strong>Fig 1: </strong>The good, the bad, and ugly categories here are trying to tell you one thing, you should respect levels. At the level of the loop when should indent everything under it until we finished the loop and so on with every other thing in Python whether it is a class, a function, or even a long list.</figcaption>
</figure>


<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> the code clinic
</div>

Below are three different Python functions that all calculate the area of a rectangle. Read them all, then answer the questions that follow. 

```python
# ------------------
# Version A
# ------------------

# A constant for a default value, clearly named.
DEFAULT_WIDTH = 1

def calculate_area(length, width=DEFAULT_WIDTH):
    """Calculates the area of a rectangle."""
    return length * width

# ------------------
# Version B
# ------------------

def area(x, y):
 return x*y

# ------------------
# Version C
# ------------------

w=1
def calc(l,wth=w):
 d = (l, wth); return d[0]*d[1] # Using a tuple for no reason
```

**Questions**:
1. Which version is the easiest to read and understand at a glance? Why?
2. In Version B, what do the variables x and y represent? Is it immediately obvious?
3. In Version C, the code is confusing. What makes it so difficult to follow?
4. If you had to use one of these functions in a large project, which would you choose and why?

<details>
<summary>hint</summary>

There's no code to write here! Just think about clarity. Good code should read a bit like plain English. Which version comes closest to that?

</details>

<details>
<summary>solution</summary>

1. Version A is the easiest to read. The function and variable names are descriptive (`calculate_area`, `length`, `width`), and it's well-spaced.
2. In Version B, it's impossible to know what `x` and `y` are without guessing from the function name `area`. They could be length and width, or base and height. This ambiguity is bad.
3. Version C is ugly because it uses an unclear variable name (`l`), creates an unnecessary tuple (`d`), and puts a comment on the same line as the code, making it cluttered.
4. You should always choose Version A. It's predictable, readable, and easy to maintain. New developers can understand it instantly without having to decipher it like a puzzle.

</details>
</div>


### Naming conventions
I don't need to tell you that the name is Python can only start with a letter or an underscore and can only contain English letters, underscores, and numbers. Apart from that, we have some nice to follow rules to help us clear our mind when choosing the naming style: 
- variables and functions: snake_case (lower case with underscores)
- class names: PascalCase (capitalised words and abbreviations like `MITCourse` not `MitCourse`)
- constants: UPPER_CASE (upper case with underscores)

```python
first_name = "Mohamed"
def display_plot(): ...
class DataProcessor: ...
```

```python
# Calculate how many hours in one year
def calculate_hours(year_days, day_hours): 
    return year_days * day_hours

YEAR_DAYS = 365.25     # number of days in a year
DAY_HOURS = 24      # number of hours in a day

# Now you can see the difference
result = calculate_hours(year_days=YEAR_DAYS, day_hours=DAY_HOURS)
print(result)
```

<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> check the names
</div>

The following code calculates a shopping bill with tax. It works, but it's a mess! Copy this code and fix it by: 
1. Correcting the indentation 
2. Adding proper whitespace around operators (`=`, `*`, `+`)
3. Renaming the variables and constants to be descriptive and follow Python conventions (`snake_case` for variables, `ALL_CAPS` for constants). 

```python
# some items
items=[10,20,30]
TAX=0.14

def GETTOTAL(list_of_items):
  total=0
  for I in list_of_items:
      total+=I
  total=total+(total*TAX)
  return total

print(GETTOTAL(items))
```

<details>
<summary>hint</summary>

Remember that constants (like `TAX`) should be in all capital letters. Function and variable names should be in `snake_case` (all lowercase with underscores). Most operators need a space on either side.

</details>

<details>
<summary>solution</summary>

```python
# A constant for the tax rate.
TAX_RATE = 0.14

# A list of prices for items in a shopping cart.
item_prices = [10, 20, 30]

def get_total_bill(prices):
    """Calculates the sum of prices and adds tax."""
    subtotal = 0
    for price in prices:
        subtotal += price
    
    final_total = subtotal + (subtotal * TAX_RATE)
    return final_total

print(get_total_bill(item_prices))
```

</details>
</div>


### Comments
Like everything we do in our life, almost all people can see what we do, but we want to tell them why we do it. Take a deep breath and think about the reason why you want to learn Python because I don't just want you to tell me that you are learning. The same thing applies here with your code, but we are not explaining only the why, there is more...

#### Inline comments
The comments next to the code and in the same line are called inline comments and you should at least give 2 spaces between the code and the comment. Another important thing is that you have to explain why you wrote this line of code (The good) not what the code does (the bad) and not tell your sadness story and how hard your life is (the ugly). 

```python 
# The good

x += 1    # Compensate for border
```

```python 
# The bad

x += 1    # Increment x
```

```python 
# The ugly

x += 1     # UPDATING X: Incrementing var (x) by 1 because stupid boss Karen said so ...
```

#### Block comments
Block comment should be a sentence and start with a capital letter except starting with a variable or something that you have defined before and starts with lower case letter. 

**Why explanation comment** <br>
Other times you will find writing comments is not about the why. Instead, it is about clarifying non-obvious algorithms, workarounds, or business rules. 

```python 
# Calculate discount: 15% for loyal users, 10% for holidays (see RFC-732)
if user.is_loyal or is_holiday_season:
    discount = 0.15 if user.is_loyal else 0.10
```

**Warning comment** <br>
flag side effects or critical behaviours

```python 
# !! Changing this threshold will break legacy integrations!
PAYMENT_TIMEOUT = 30000
```

**TODO comment** <br>
track temporary fixes or future work

```python
# TODO: Migrate to Redis cache after resolving PROJ-142 infrastructure upgrade
#       - Requires shared Redis cluster deployment
#       - Remove temporary in-memory caching logic
# Owner: backend-team@company.com
temp_cache: dict[str, User] = {}
```

#### Docstring
The last but not least is writing a doc string. This is different from block comments and inline comments. It mainly used for documenting functions and classes. It should contain a brief overview of what the function do, parameters (or arguments), return values, and errors. 

```python
def calculate_invoice(total: float, tax_rate: float) -> float:
    """
    Calculates final invoice amount including tax.
    
    Args:
        total: Pre-tax amount (must be >= 0)
        tax_rate: Tax percentage (e.g., 0.05 for 5%)
    
    Returns:
        Rounded total including tax
    
    Raises:
        ValueError: If total is negative
    """
```


<div class="exercise">
<div id="practical-exercise-3" class="exercise-head">
<b>Practical exercise 3:</b> get it documented
</div>

The function below is clean but lacks any explanation. Add comments to it: 
1. Add a docstring that explains what the function does, its parameters, and what it returns.
2. Add a block comment explaining the overall strategy of the `for` loop.
3. Add an inline comment to clarify the purpose of the modulo operator (`%`) on the `if` line.

```python
def sum_of_even_numbers(number_list):
    total = 0
    for number in number_list:
        if number % 2 == 0:
            total += number
    return total
```

<details>
<summary>hint</summary>

A docstring goes inside triple quotes `"""..."""` right after the `def` line. A block comment explains a chunk of code. An inline comment clarifies a single, potentially confusing part of a line.

</details>

<details>
<summary>solution</summary>

```python
def sum_of_even_numbers(number_list):
    """
    Calculates the sum of only the even numbers in a list.

    Args:
        number_list: A list of integers.

    Returns:
        An integer representing the sum of the even numbers.
    """
    total = 0
    
    # We will iterate through each number in the provided list
    # and check if it is even. If it is, we add it to our
    # running total.
    for number in number_list:
        if number % 2 == 0:  # The modulo operator checks for a remainder of 0.
            total += number
            
    return total
```

</details>
</div>


## Performance 
The one constant in writing code is that it changes over time ([Nelson, 2024](#nelson_2024)). And, with take continuous change, there is a need for continuous enhancements. Also, I want you to understand that not all code is created equal. Two pieces of code can do the same thing, but one can be much faster or more efficient than the other. However, you should start analysing or trying to improve the performance of your code unless it works the way it should. So, "first make it work, then make it fast."

<figure id="fig:what-is-performance">
  <img src="../images/what-is-performance.png">
  <figcaption align="center" style="color: gray; "><strong>Fig 2: </strong>The three primary factors that define the performance of Python code: Speed (how fast the code runs), Memory usage (the amount of system memory the code consumes), and Scalability (the code's ability to handle increasing workloads).</figcaption>
</figure> 

### What is performance
Although performance is not just about how fast you code run, the "performance" cover one (or more) of the following: 
- Speed: how fast does your code run? (this is the one that we all know)
- Memory usage: how much RAM does it need while running? (see [Gorelick, 2020](#gorelick_2020) for more)
- Scalability: will it still work well if the data gets 100x bigger? (highly important when working with large systems)


### Performance tips
There are a lot of aspects that affect the code performance from the data structure that you use to the library that you work with, every bit of code matters and can impact the performance. So, to keep this lecture simple (to some point), I will just give you some performance quick tips: 
- Use built-in functions instead of your own functions that you wrote by your own. I'm not insulting you or saying that you are a bad coder but built-in functions always have the advantage because they are written in C, so they're much faster.
- Avoid unnecessary loops - don't make your code loop over a list twice if it can reach the desired outcome by only one loop. 
- Use libraries like NumPy or Pandas for large datasets - they are optimised for performance and can help you save more time and avoid building things from scratch. 
- Don't repeat yourself - never write the same code or similar code more than one time. Turn that code block that you keep using into a function or a class so you can use it again with a tiny change in parameters. 
- Ignore every tip above if it will harm you code functionality, if applying any advice will change how your code work and go far from the desired result then don't apply it. Only apply the tips if you saw that it has helped your code. 


<div class="exercise">
<div id="practical-exercise-4" class="exercise-head">
<b>Practical exercise 4:</b> The speedster
</div>

**Tip**: In Python, repeatedly adding to a string in a loop using the + operator can be very slow because a new string has to be created in memory with every addition. A much faster way to build a string from many small pieces is to add them to a list and then use the `.join()` method at the end.

The function below builds a long string of comma-separated numbers. Rewrite it to be more performant by using a list and the `.join()` method.

```python
def create_csv_string(count):
    """Creates a string of numbers from 0 to count-1, separated by commas."""
    result_string = ""
    for i in range(count):
        result_string += str(i)
        if i < count - 1:
            result_string += ","
    return result_string

# Example usage (don't worry if this is slow, that's the point!)
print(create_csv_string(10))
```

<details>
<summary>hint</summary>

First, create an empty list. Inside the loop, `append` each number (as a string!) to the list. After the loop is finished, use `",".join(your_list_of_strings)` to create the final string in one efficient step.

</details>

<details>
<summary>solution</summary>

```python
def create_csv_string_fast(count):
    """
    Creates a string of numbers from 0 to count-1, separated by commas.
    This version is much more performant by using a list and .join().
    """
    # Add all numbers (as strings) to a list first.
    number_strings = []
    for i in range(count):
        number_strings.append(str(i))
    
    # Join the list elements into a single string with a comma separator.
    # This is much faster than using '+' in a loop.
    return ",".join(number_strings)

# Example usage
print(create_csv_string_fast(10))
```

</details>
</div>


## Additional Reading
[<span id="nelson_2024">1</span>] Catherine Nelson. (2024). Software Engineering for Data Scientists. O’Reilly Media, Inc. https://www.oreilly.com/library/view/software-engineering-for/9781098136192/ <br>

[<span id="gorelick_2020">2</span>] Gorelick, M., & Ozsvald, I. (2020). High Performance Python. https://www.oreilly.com/library/view/high-performance-python/9781492055013/

[<span id="pep8"> 3 </span>] Guido van Rossum, Barry Warsaw, & Alyssa Coghlan. (2001). PEP 8 - Style Guide for Python Code. https://peps.python.org/pep-0008/


