---
title: "2. Pythonic iterations"
date: 2025-08-09
weight: 2
type: docs
tags: 
- Python
---

Unlike "CS introduction with Python" courses, the goal here, from the beginning, is to use Python effectively so we need to learn as much Python features as we could. However, if you came from another programming language, you will probably search on applying that language's features in Python. In that case, you will miss what Python offers. For example, if you've never seen it tuple unpacking before, you will probably not search for them, and you may end up not using this feature just because it is specific to Python ([Ramalho, 2022](#ramalho_2022)). So, you need to keep your eyes open.

In fact, Python offers a "toolkit" of built-in features that can dramatically simplify your code, improve the performance, and help you write more expressive logic. That's why we are going to dive into these tools: sequences, comprehensions, enumerate, zip, and unpacking.


## Sequences
You might know that Guido is the creator of Python, and if you didn't know, it's my pleasure to tell you. But the important point here is before creating Python, Guido worked on a 10-years research project called ABC. The project aims to design a programming environment for beginners. Yes. that's why Python is very beginner friendly with easy syntax compare to many other programming languages. But the idea of ABC wasn't just the simple syntax, ABC introduced many ideas we now consider "Pythonic" ([Ramalho, 2022](#ramalho_2022)).

Like ABC, Python has this uniform way of handling sequences. But before going any further, what is a sequence? Well, it is an ordered collection of items. There are two types of built-in sequences that are implemented in C as I told you in [lecture 1](https://m101yosef.github.io/teaching/advanced-python/lecture1); *container sequences* which can hold items of different data types, including nested containers. Some examples are `list`, `tuple`, and `collections.deque`. Also, we have *flat sequences* that can only hold items of one primitive data type (eg. `str`, `byte`, `numpy.array`). 

### Flat and container sequences 
Flat sequences can be very handy in cases when performance is needed like in AI models where container sequences is preferred when needing flexibility like in analysing complex data. Apart from that, I want us to go more in depth and test if a NumPy array (a flat sequence) will perform better than a list (a container sequence). And to do so, we will measure the time needed to sum a list verses an array. 

```python
import time
import sys      # To measure memory usage of Python objects
import numpy as np

# -----------------------
# 1. Create test data
# -----------------------
# Create a big tuple of numbers from 0 to 9,999,999 (10 million numbers)
python_tuple = tuple(range(10_000_000))

# Create a NumPy array with the same numbers
numpy_array = np.array(python_tuple)

# -----------------------
# 2. Measure memory usage
# -----------------------
# For the tuple: 
# we add the size of the tuple container + the size of each integer inside it
tuple_mem = sys.getsizeof(python_tuple) + sum(sys.getsizeof(x) for x in python_tuple)

# For the NumPy array: 
# .nbytes gives the total memory taken by the numbers inside
numpy_mem = numpy_array.nbytes

print(
    "Memory usage",
    f"Tuple memory usage: {tuple_mem / (1024**2):.4f} MB",
    f"NumPy array memory usage: {numpy_mem / (1024**2):.4f} MB",
    sep="\n"   # Print each on a new line
    )

# -----------------------
# 3. Measure performance (sum)
# -----------------------
# Time how long it takes to sum all numbers in the tuple
start = time.time()
sum(python_tuple)  # Python loops through each element in pure Python
end = time.time()
tuple_sum_time = end - start

# Time how long it takes to sum all numbers in the NumPy array
start = time.time()
numpy_array.sum()  # NumPy uses fast C code under the hood
end = time.time()
array_sum_time = end - start

print(
    "\n\nSpeed comparison",
    f"Tuple sum time: {tuple_sum_time:.4f} seconds",
    f"NumPy array sum time: {array_sum_time:.4f} seconds", 
    sep="\n"   # Print each on a new line
    )

```

```
Memory usage
Tuple memory usage: 343.3228 MB
NumPy array memory usage: 76.2939 MB


Speed comparison
Tuple sum time: 0.0920 seconds
NumPy array sum time: 0.0077 seconds
```

The question here is why NumPy arrays are more compact and faster? NumPy array is like packing identical items tightly in a box so we only need to label the box since all elements have the same type. On the other hand, tuples are like keeping each item in its own separate box with a label. The packed version takes less space and si faster to work with because you can grab everything in one go. 

<figure id="fig:tuple-vs-array">
  <img src="../images/tuple-vs-array.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>The memory usage for a tuple and an array both contain two floats</figcaption>
</figure>

### Tuples have a power too
With proved experiment NumPy arrays won the game against tuples but it cannot win every game. Tuples can't be changed after creation (immutable object) which is great for data you want to protect from accidental modification. Also, like I said earlier, lists and tuples along side with all container sequences can store anything; numbers, strings, objects, even other lists. What I'm trying to teach you here is that to be a good Python coder, you need to make use of every object's advantages based on the game you are in.

## List comprehensions and generator expressions
I didn't learn comprehensions until I saw them on an online test for a job. After that, I felt like wow what it is nice trick. At first I thought that I only could do this trick on lists but I then discovered that I can also apply it on all kinds of sequence but instead of saying list comprehensions, it's called generator expression. Put the naming aside, they make the code shorter, clearer, and faster than manual loops. 

```python

# ----------------------------------------
# Goal create list of even numbers in range 10 million
# ----------------------------------------


# Method 1: manual loop 
evens = []
for x in range(10_000_000): 
    if x % 2 == 0:
        evens.append(x)


# Method 2: list comprehension
evens = [x * 2 for x in range(10_000_000) if x % 2 == 0]

```

List comprehensions are often 20-30% faster than equivalent for-loops in pure Python. However, at first, you will find it is kind of hard to read it but with time, you will say that using list comprehension is more readable. Generator expressions will shine the most when you need to do quick operations without saving the sequence on memory (e.g sum the squares of numbers between 0 and 16)

```python

# -------------------------------------
# Goal sum the squares of numbers between 0 and 16
# -------------------------------------


# Method 1: manual loop
total = 0
for x in range(17): 
    total += x**2

# Method 2: generator expression
total = sum(x**2 for x in range(17))  # even better than list comprehension
```

So, as a rule of thumb, when you need the results stored to plot it or to use the points again in some how, then use list comprehensions. Meanwhile, if you only need to get the result and you don't care about the points use operation combined with the generator expression. And, don't forget that you can still use loops when the logic is too complex and involves multiples steps. 

<figure id="fig:loops-comprehension-flowchart">
  <img src="../images/loops-comprehension-flowchart.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>A flowchart to help you choose what to use; a loop, a list comprehension, or a generator expression</figcaption>
</figure>


## Packing and Unpacking
In Python, what we mean by packing is to take multiple iterables (lists, tuples, etc.) and combine them into tuples with the use of `zip`. 

```python
names = ["Mohamed", "Yosef", "Faiz"]
letters = [len(name) for name in names]

# Pack into pairs
packed = zip(names, letters)
print(list(packed))
```
```
[('Mohamed', 7), ('Yosef', 5), ('Faiz', 4)]
```

Now, suppose that we also want the position/index for each element without manually managing a counter.

```python
names = ["Mohamed", "Yosef", "Faiz"]
letters = [len(name) for name in names]

for index, (name, letters) in enumerate(zip(names, letters), start=1):   
    print(f"{index}. {name} contains {letters} characters")

# NOTE: the default value for 'start' is 0
```
```
1. Mohamed contains 7 characters
2. Yosef contains 5 characters
3. Faiz contains 4 characters
```

Obviously, unpacking reverses the process and we can also do that with `zip`

```python
packed = [('Mohamed', 7), ('Yosef', 5), ('Faiz', 4)]

# unpack into separate lists
names, scores = zip(*packed)
```

This opens a new whole world of playing with loops and lists but more on that in the next lecture...


## Exercises
The best way to truly master these concepts is to put them into practice. Don't just read the code; write it yourself. Take a blank editor and try these exercises from scratch.

1. You have a list of strings: `words = ["apple", "banana", "kiwi", "grape"]`.Create a new list containing only the words that have an even number of letters.

2. Write two way to create a list of odd numbers in range 10 million. Also, measure the speed and memory usage for each way then write your observations.

3. You have two lists: `products = ["Laptop", "Mouse", "Keyboard"]` and `prices = [1200, 25, 75]`. Use zip and a for loop to print each product and its price in the format: "The Laptop costs $1200."

4. You have three lists: `names = ["Alice", "Bob", "Charlie"]`, `scores = [95, 88, 92]`, and `gpa = [3.8, 3.5, 3.9]`. Use a single for loop with zip and enumerate to print a ranked summary for each student, like this: "Rank 1: Alice (95, GPA: 3.8)".



## References
[<span id="ramalho_2022">1</span>] Luciano Ramalho. (2022). Fluent Python (2nd edn). O’Reilly Media, Inc. https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/ <br>