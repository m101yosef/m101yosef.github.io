---
title: "1. Idiomatic Python & Clean Code"
date: 2025-07-30
weight: 1
type: docs
tags: 
- Python
---


Good code is important when your code integrates with large systems. 

artisitic code: something that is well done 

the one constant in writing code is that it changes over time


- code formating with PEP8, errors
- simplicity; don't repeat yourself
- Writing modular code is the art of breaking a big system into smaller components.
- code is read much more often than it is written, PEP8



## What is "Idiomatic Python"?

> **Idiomatic Python** means: *writing Python the way experienced Python developers write it*.

Think of it like using the **natural language of Python** instead of just forcing it like C or Java.

❌ Not idiomatic:

```python
i = 0
while i < len(mylist):
print(mylist[i])
i += 1
```

✅ Idiomatic:

```python
for item in mylist:
    print(item)
```

You get the same result — but the second one is **cleaner**, easier to read, and feels more like *Python*.

---

## 🧼 Clean Code in Python = Follow PEP8

### 🧾 What is PEP8?

PEP8 is the **official style guide** for Python code — it helps everyone write code in the same, clean way.

---

### ✍️ Key PEP8 Rules (with examples):

#### ✅ 1. **Variable Naming**

* Use `snake_case` for variables and functions
* Use `CamelCase` for class names

```python
user_name = "Mohamed"
def calculate_total(): ...
class DataProcessor: ...
```

Avoid:

```python
UserName = "wrong"
CalculateTotal = "wrong"
```

---

#### ✅ 2. **Indentation**

* Always use **4 spaces** for indentation (NOT tabs)

```python
def say_hello():
    name = "Mohamed"
    print("Hello", name)
```

Bad:

```python
def say_hello():
  print("Too short")
	print("Too long/tabbed")
```

---

#### ✅ 3. **Line Length**

* Keep lines **under 79 characters**
* If it’s too long, break it with backslash `\` or parentheses `()`

---

#### ✅ 4. **Spacing**

* Add **1 space** around operators and after commas:

```python
total = price + tax
my_list = [1, 2, 3]
```

Bad:

```python
total=price+tax
my_list=[1,2,3]
```

---

#### ✅ 5. **Blank Lines**

Use empty lines to separate **logical parts** of your code:

```python
def load_data():
    ...

def process_data():
    ...
```

---

## 🛠 Tips for Writing Clean Python

* Use **meaningful variable names**:

  ```python
  temp = 98.6         # ok
  t = 98.6            # not clear
  body_temperature = 98.6  # better
  ```

* Avoid deeply nested code — break it into small functions

* Use comments, but only when needed (code should explain itself)

* Don’t repeat yourself — DRY (Don’t Repeat Yourself)

* Use **docstrings** for functions and classes:

  ```python
  def calculate_area(radius):
      """Calculate area of a circle given the radius"""
      return 3.14 * radius ** 2
  ```

---

## 🧪 Mini Exercise

Fix the code below to make it clean and idiomatic:

```python
def HELLO():
	print("hello")

def add(a,b):return a+b
```

✅ Your version should look like:

```python
def say_hello():
    print("hello")

def add(a, b):
    return a + b
```

---

## 🧠 Recap

| Topic            | Key Point                                |
| ---------------- | ---------------------------------------- |
| Idiomatic Python | Write code the “Pythonic” way            |
| PEP8             | Follow standard style for clean code     |
| Variable names   | Use `snake_case`, not camelCase          |
| Indentation      | Always use 4 spaces                      |
| Readability      | Clean code = easier to work with & debug |

---

## 🧭 Homework / Practice

* Install a linter: `flake8` or use an IDE like VS Code with auto-formatting.
* Rewrite an old script using clean code practices.
* Try writing 3 small functions that follow PEP8 rules.

---

Let me know if you'd like slides for this lecture, or want it in Arabic, or if you want me to draft Lecture 2 as well!

