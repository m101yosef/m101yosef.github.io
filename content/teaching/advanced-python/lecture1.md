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



### Naming conventions
I don't need to tell you that the name is Python can only start with a letter or an underscore and can only contain English letters, underscores, and numbers. Apart from that, we have some nice to follow rules to help us clear our mind when choosing the naming style: 
- variables and functions: snake_case (lower case with underscores)
- class names: CamelCase (capitalised words and abbreviations like `MITCourse` not `MitCourse`)
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


## Exercises

1. The following code has bad formatting, poor naming, and unnecessary loops. Rewrite it so that it follows PEP 8 and performance tips. 
```python
def calc(A,B):
  r=0
  for i in A:
    if i in B:
      r += 1
  for i in A:
    if i in B:
      print(i)
  return r

listA=[1,2,3,4,5]
listB=[3,4,5]
print(calc(listA,listB))
```

2. Write three short versions of a while-loop printing numbers 1 to 5:
    - The good version (proper indentation and spacing)
    - The bad version (single-line, hard to read)
    - The ugly version (broken indentation)

3. Rename the following so they follow correct Python naming conventions
```python
DaysInMonth = 30
getuserName = lambda: "Ali"
class paymentgateway: ...
```

4. Write a docstring for this function following the lecture's format
```python
def fahrenheit_to_celsius(temp):
    return (temp - 32) * 5 / 9
```

## Next lecture overview
After seeing how clean formatting and smart coding habits can make your Python code easier to read and perform better, we will talk about sequences and dive into: 
- Comprehensions - shortcut to write powerful loops in one line 
```python
# Two ways to create a list

# List comprehensions for better performance 
squares_1 = [x**2 for x in range(10)]

# The usual and less efficient way with loops
squares_2 = []
for x in range(10): 
    squares_2.append(x**2)

print(squares_1 == squares_2)
```

- zip - for pairing things up 
```python
# Get player's number

players = ['Ronaldo', 'Messi', 'Suarez']
numbers = [7, 10, 9]

for player, number in zip(players, numbers): 
    print(f"Number {number} represents {player}")
```
```
Number 7 represents Ronaldo
Number 10 represents Messi
Number 9 represents Suarez
```
- enumerate - for tracking index without manual counting
```python
# Loop through a list with index without using range(len(...))

letters = ['a', 'b', 'c', 'd']

for index, letter in enumerate(letters): 
    print(f"{index}: {letter}")
```
```
0: a
1: b
2: c
3: d
```
- Unpacking - to break things apart and reassemble them 
```python
# Split a collection into variables in one line 

point = (3, 4)
x, y = point

print(f"x = {x}, y = {y}")
```
```python
# You can also use unpacking in loops:

pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
for num, char in pairs:
    print(num, char)

```


## Additional Reading
[<span id="nelson_2024">1</span>] Catherine Nelson. (2024). Software Engineering for Data Scientists. O’Reilly Media, Inc. https://www.oreilly.com/library/view/software-engineering-for/9781098136192/ <br>

[<span id="gorelick_2020">2</span>] Gorelick, M., & Ozsvald, I. (2020). High Performance Python. https://www.oreilly.com/library/view/high-performance-python/9781492055013/

[<span id="pep8"> 3 </span>] Guido van Rossum, Barry Warsaw, & Alyssa Coghlan. (2001). PEP 8 - Style Guide for Python Code. https://peps.python.org/pep-0008/



<br><br>

See you in the next lecture - and bring your curiosity with you!
