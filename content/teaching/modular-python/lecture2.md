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
You might know that Guido is the creator of Python, and if you didn't know, it's my pleasure to tell you. However the important point here is before creating Python, Guido worked on a 10-years research project called ABC. The project aims to design a programming environment for beginners. Yes. that's why Python is very beginner friendly with easy syntax compare to many other programming languages. But the idea of ABC wasn't just the simple syntax, ABC introduced many ideas we now consider "Pythonic" ([Ramalho, 2022](#ramalho_2022)).

Like ABC, Python has this uniform way of handling sequences. But before going any further, what is a sequence? Well, it is an ordered collection of items. There are two types of built-in sequences that are implemented in C as I told you in [lecture 1](https://m101yosef.github.io/teaching/advanced-python/lecture1); *container sequences* which can hold items of different data types, including nested containers. Some examples are `list`, `tuple`, and `collections.deque`. Also, we have *flat sequences* that can only hold items of one primitive data type (eg. `str`, `byte`, `numpy.array`). 

<figure id="fig:sequences">
  <img src="../images/sequences.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>Grouping sequences based on the number data types they can store at once. Container sequences can store more than one data type or even have nested ones while flat sequences only stores one data type.</figcaption>
</figure>


## Operations common to all sequences
All sequences regardless of their internal implementation, they share a uniform interface that makes them easy to manipulate and reason about. The following are the fundamental operations that apply to all built-in sequence types in Python: 

1. Indexing allows direct access to an element at a specific position in a sequence. Indexes are zero-based, meaning the first element is at position 0 unlike other languages like R where the index starts from 1. Additionally, negative indexes count from the end, with `-1` referring to the last element. 

```python
letters = ['a', 'b', 'c', 'd']
print(letters[0])   # 'a'
print(letters[-1])  # 'd'
```
If the specified index is out of range, Python raises an `IndexError`.

2. Slicing enables the extraction of a subsequence by specifying a start index, and end index, and an optional step. The slice notion is written as: `sequence[start:end:step]`. Knowing that `start` is inclusive but `end` is exclusive while `step` determines the stride between elements. 

```python
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])    # [1, 2, 3]
print(numbers[:3])     # [0, 1, 2]
print(numbers[::2])    # [0, 2, 4]
```
Slicing never raises an error for out-of-range indices; it simply adjusts to the available elements.

3. Concatenation joins two sequences of the same type using the `+` operator. 

```python
a = [1, 2]
b = [3, 4]
print(a + b)    # [1, 2, 3, 4]

s1 = "Hello, "
s2 = "World!"
print(s1 + s2)  # "Hello, World!"
```
Note that concatenation does not work between sequences of different types.

4. Repetition creates a new sequence by repeating the original sequence a specified number of times, using the `*` operator. 

```python
letters = ['a', 'b']
print(letters * 3)    # ['a', 'b', 'a', 'b', 'a', 'b']

line = "-" * 5
print(line)           # "-----"
```
If the multiplier is zero or negative, the result is an empty sequence. 

5. Membership testing with `in` and `not in` operators to check whether an element exists in a sequence. 

```python
nums = [10, 20, 30]
print(20 in nums)       # True
print(40 not in nums)   # True

word = "Python"
print("th" in word)     # True
```
Membership testing is particularly useful in conditional statements. 

6. Getting the length by `len()` function that returns the number of elements in a sequence. 

```python
data = [1, 2, 3, 4]
print(len(data))   # 4

print(len("Hello"))  # 5
```
This operation is universal across all standard sequence types.

7. Iteration means traversing the elements of a sequence, typically using a `for` loop. 

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```
Iteration works uniformly across sequences, making it a powerful abstraction in Python.


<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> Your favourite things
</div>

1. Make a list of at least four of your favourite foods and assign it to a variable called `favourite_foods`. 
2. Print the first food in the list. Then print the last food in the list using negative indexing. 
3. Create a new list called `middle_foods` that contains only the second and third items from you original list. Print the new list. 
4. Imagine you're very hungry. Create a new list called `big_meal` by adding your `favourite_foods` list to itself (`+`) and then multiplying it by 2 (`*`). Print the final `big_meal` list. 


<details>
<summary>hint</summary>

- Remember that list indices start at 0. The first item is at index [0] and the last is at [-1].
- Slicing syntax is `[start:stop]`. The `stop` index is not included. To get the second and third items, you'd start at index 1 and stop at index 3.

</details>

<details>
<summary>solution</summary>

```python
# 1. Create a List
favourite_foods = ["Pizza", "Shawarma", "Koshari", "Molokhia"]
print(f"Original list: {favourite_foods}")

# 2. Access Elements
print(f"First food: {favourite_foods[0]}")
print(f"Last food: {favourite_foods[-1]}")

# 3. Slice the List
middle_foods = favourite_foods[1:3]
print(f"Middle foods: {middle_foods}")

# 4. Concatenate and Repeat
big_meal = (favourite_foods + favourite_foods) * 2
print(f"Big meal: {big_meal}")
```

</details>
</div>


## Unique operations and use cases
In the previous section, we examined the common operations that all Python sequences share, such as indexing, slicing, and iteration. However, not all of your fingers are the same, not all sequences are created equal. Some are containers, capable of holding objects of arbitrary type, while other are flat sequences, storing homogeneous data in memory-efficient representations.

What really makes the difference between sequence types are their unique operations and different use cases. And, it is clear that understanding these subtleties allows you to choose the most appropriate sequence type for you situation. 

1. **List**. Mutable operations such as `.append()`, `.extend()`, `.insert()`, `.remove()`, and `.sort()`. Also, list allows in-place modification of elements. Lists work for general-purpose, ordered collections but best suited when elements must be updated, reordered, or extended dynamically. 

```python
numbers = [3, 1, 4]
numbers.append(2)       # [3, 1, 4, 2]
numbers.sort()          # [1, 2, 3, 4]
```

2. **Tuple**. Immutable (doesn't change), hence hashable (can be used as dictionary key). Also, supports packing and unpacking. Best use cases I can think of is representing fixed collections like data records (e.g. rows in a table) where immutability conveys meaning. 

```python
# Packing values into a tuple
t = 1, 2, 3  # Or explicitly: t = (1, 2, 3)

a, b, c = t  # Unpacks (1, 2, 3) into a=1, b=2, c=3
print(a, b, c)  # Output: 1 2 3
```

3. `collections.deque` while I will talk about this in the next lecture but it worth to say that it allows us to build two of the most popular conceptual data structures (queue and stack). Ideal for breadth-first search, scheduling, and sliding window problems. 

```python
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)    # deque([0, 1, 2, 3])
dq.pop()            # deque([0, 1, 2])
```

4. `str` Python offers a rich set of methods for text processing: `.split()`, `.join()`, `.replace()`, `.startswith()`, `.endswith()`. Obviously, `str` is the natural choice for working with textual data as well as its efficiency in searching, formatting, and parsing strings. 

```python
sentence = "Python is fun"
words = sentence.split()    # ['Python', 'is', 'fun']
```

5. `bytes`. Immutable sequences of raw bytes with specialised methods like `.hex()` and `.decode()`. Used for low-level binary data (files, network protocols, cryptography). Interfacing with external systems that require byte-oriented communication. 

```python
data = b'hello'
print(data.hex())   # '68656c6c6f'
```

6. `numpy.array` it is a very unique collection for mathematical operations. Used in numerical computing, linear algebra, machine learning, and image processing. Also, preferred when performance and large-scale data handling are required. 

```python
import numpy as np
arr = np.array([1, 2, 3])
print(arr * 2)    # [2 4 6]
```


<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> Modifying and understanding immutability
</div>

1. Using your `favourite_foods` list from the last exercise, add a new food to the end of it using the `.append()` method.
2. Now, remove the second food from the list using the `.pop()` method. Print the list to see the changes.
3. Create a string variable `my_name = "Alex"`. Try to change the first letter to 'E' using indexing: `my_name[0] = 'E'`.
4. You will get a `TypeError`. Discuss with your neighbour: why did this happen? How does this demonstrate the concept of immutability?


<details>
<summary>hint</summary>

- To add an item, you'll call `favourite_foods.append("YourNewFood")`.
- To remove the second item, the index is 1. You'll use `favourite_foods.pop(1)`.
- The error in step 3 is the expected result! It's the most important part of the exercise.

</details>

<details>
<summary>solution</summary>

```python
favourite_foods = ["Pizza", "Shawarma", "Koshari", "Molokhia"]

# 1. Modify Your List
favourite_foods.append("Falafel")
print(f"After appending: {favourite_foods}")

# 2. Remove an Item
favourite_foods.pop(1) # Removes "Shawarma"
print(f"After popping index 1: {favourite_foods}")

# 3. Attempt to Change a String
my_name = "Alex"
try:
    my_name[0] = 'E'
except TypeError as e:
    # 4. Observe the Error
    print(f"\nAttempting to change the string resulted in a TypeError: {e}")
    print("This happens because strings are immutable and cannot be changed in place.")
```

</details>
</div>


## The memory efficiency of flat sequences
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


<div class="exercise">
<div id="practical-exercise-3" class="exercise-head">
<b>Practical exercise 3:</b> Structuring data with tuples
</div>

1. Represent a student's record as a tuple containing their ID, name, and GPA. For example: `student_one = (105, "Mohamed Yosef", 3.8)`.
2. Print the student's name by accessing the correct index in the tuple.
3. Create a list that contains three different student tuples. This demonstrates a common pattern: a list of tuples. Print the list.


<details>
<summary>hint</summary>

- Creating a tuple is just like creating a list, but with () instead of [].
- Accessing elements in a tuple uses the same [index] notation as lists.
- A list of tuples will look like [ ( ... ), ( ... ), ( ... ) ].

</details>

<details>
<summary>solution</summary>

```python
# 1. Create a Record
student_one = (105, "Mohamed Yosef", 3.8)

# 2. Access Data
# Name is at index 1
print(f"Student's Name: {student_one[1]}")

# 3. Group Records
student_two = (106, "Fatima Al-Sayed", 3.9)
student_three = (107, "Ali Hassan", 3.5)

all_students = [student_one, student_two, student_three]
print(f"List of all students: {all_students}")
```

</details>
</div>


## Iterables and iterators
An iterable is any Python object capable of returning its elements one after another (e.g. `list`, `tuple`, `str`). Formally, an object is iterable if it implements the special method `iter()` which returns and iterator. 

```python
data = [1, 2, 3]
for x in data:     # list is iterable
    print(x)
```

An iterator is an object that maintains a state and produces elements of a sequence one by one. An object is iterator if it implements both `iter()` and `next()` 

```python
data = [1, 2, 3]
it = iter(data)   # get iterator
print(next(it))   # 1
print(next(it))   # 2
print(next(it))   # 3
# next(it) would raise StopIteration
```


<div class="exercise">
<div id="practical-exercise-4" class="exercise-head">
<b>Practical exercise 4:</b> The <code>For</code> loop
</div>

1. Using the `all_students` list from the previous exercise, write a standard `for` loop that iterates over it and prints each student tuple.
2. Let's see what the `for` loop does behind the scenes.
    - Create an iterator from your list: `student_iterator = iter(all_students)`
    - Get and print the next three students, one by one.
    - Try to get one more. You'll get a `StopIteration` error. This is how the `for` loop knows when to stop!

<details>
<summary>hint</summary>

- A standard `for` loop looks like: `for item in my_list:`.
- Use the built-in function `iter()` to get an iterator and `next()` to get the next item from it.

</details>

<details>
<summary>solution</summary>

```python
all_students = [(105, "Mohamed Yosef", 3.8), (106, "Fatima Al-Sayed", 3.9), (107, "Ali Hassan", 3.5)]

# 1. Standard Loop
print("--- Using a for loop ---")
for student in all_students:
    print(student)

# 2. Manual Iteration
print("\n--- Manual Iteration ---")
student_iterator = iter(all_students)

print(next(student_iterator))
print(next(student_iterator))
print(next(student_iterator))

try:
    print(next(student_iterator))
except StopIteration:
    print("\nStopIteration error! The iterator is exhausted, which is how a for loop knows to end.")
```

</details>
</div>


### Packing and Unpacking
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

<div class="exercise">
<div id="practical-exercise-5" class="exercise-head">
<b>Practical exercise 5:</b> Deconstructing your data
</div>

1. Take the `student_one` tuple from before: `(105, "Mohamed Yosef", 3.8)`. In a single line, unpack its ID and info (name and GPA) into two separate variables: `student_id`, `student_info`.
2. Print each new variable on its own line to confirm the unpacking worked.


<details>
<summary>hint</summary>

The pattern is `variable1, *variable2 = my_tuple`. Make sure the number of variables on the left matches the number of items in the tuple on the right unless you have variables starts with `*` they can take more than one item.

</details>

<details>
<summary>solution</summary>

```python
student_one = (105, "Mohamed Yosef", 3.8)

# 1. Unpack the tuple
student_id, *student_info = student_one

# 2. Print the variables
print(f"ID: {student_id}")
print(f"Info: {student_info}")
```

</details>
</div>


### Comprehensions and generator expressions
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

So, as a rule of thumb, when you need the results stored to plot it or to use the points again in some how, then use list comprehensions. Meanwhile, if you only need to get the result and you don't care about the points, use generator expression. This is called lazy evaluation (compute the value only when it is actually needed—and only as much as is needed). And, don't forget that you can still use loops when the logic is too complex and involves multiples steps. 

<figure id="fig:loops-comprehension-flowchart">
  <img src="../images/loops-comprehension-flowchart.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>A flowchart to help you choose what to use; a loop, a list comprehension, or a generator expression</figcaption>
</figure>


<div class="exercise">
<div id="practical-exercise-6" class="exercise-head">
<b>Practical exercise 6:</b> Become faster
</div>

1. Create a list of numbers from 1 to 10 called numbers.
2. Using a single line of code (a list comprehension), create a new list called `squared_numbers` that contains the square of each number from the original list.
3. Print the `squared_numbers` list.



<details>
<summary>hint</summary>

Your iterable is the `numbers` list. For each `number` in that list, the expression you want to compute is `number * number`. Follow the syntax: `[expression for item in iterable]`.

</details>

<details>
<summary>solution</summary>

```python
# 1. Source Data
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 2. Use a Comprehension
squared_numbers = [n * n for n in numbers]

# 3. Print the Result
print(f"Original numbers: {numbers}")
print(f"Squared numbers: {squared_numbers}")
```

</details>
</div>


## References
[<span id="ramalho_2022">1</span>] Luciano Ramalho. (2022). Fluent Python (2nd edn). O’Reilly Media, Inc. https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/ <br>