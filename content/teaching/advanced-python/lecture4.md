---
title: "4. Context managers and resources handling"
date: 2025-08-09
weight: 4
type: docs
tags: 
- Python
---

Up till now, we worked with variables, strings, numbers, and sequences. But hello?! We are in the age of big data! Is that everything? Well, this is not every thing; you can also work with external resources (e.g. files on disk, database connections, network sockets, and GPU sessions). So, what makes managing these external resources important? The main reason is because they are limited like non-renewable energy sources. Also, if you forget to release them, your program can slow down or crash. 

## The best way to handle resources
Before we start talking about advanced things, let's first look at the function that we will use most: `open()`. 
```python
open('directory/file.txt', 'r')
```
As you see, the `open` function takes at least two important arguments; the file name and path `'directory/file.txt'` as well as `'r'` which is the mode that tells Python how I want to use the file.

| Mode   | Meaning                                                             | Example                   |
| ------ | ------------------------------------------------------------------- | ------------------------- |
| `"r"`  | **Read** (default) — file must exist                                | `open("file.txt", "r")`   |
| `"w"`  | **Write** — creates new file or **overwrites** existing             | `open("file.txt", "w")`   |
| `"a"`  | **Append** — adds data to the end of file                           | `open("file.txt", "a")`   |
| `"rb"` | Read in **binary** mode                                             | `open("image.png", "rb")` |
| `"wb"` | Write in binary mode                                                | `open("image.png", "wb")` |

Now, we are ready to look for an answer to our question...

### A procedural perspective 
In the procedural style, you manually control the whole lifecycle of a resource: **acquire $\to$ use $\to$ release**. It's simple, direct, and easy to read but not always...

```python
f = open("data.txt")    # acquire
data = f.read()         # use
f.close()               # release
```
As you see, procedural resource management relies on the coder's discipline. Forgetting a single call (`f.close()`) or getting an error while reading the file could lead to resource leaks. With no doubt the simple script above is not that big deal, but in long-running applications, you will find yourself in a town of performance problems or even crashes. For me, I don't like being in a town like this. 


### A try/finally perspective
The early Python coders were just like; they also don't like being in a town of problems. As a solution, early Python developers introduced a more reliable mechanism: the `try-finally` block. The key idea is that the finally clause always executes, no matter what happens&mdash;whether your code runs successfully, raises an exception, or even returns early. 
```python
try:
    f = open("data.txt", "r")
    data = f.read()
except FileNotFoundError:
    print("File not found, please check the name.")
finally:
    print("Cleaning up...")
    try:
        f.close()
    except NameError:
        # f was never opened
        pass
```
You have two major scenarios; (1) if the file exists, it gets read, and then `finally` runs. If the file is missing, the `except` block runs, and then `finally` still runs. 

Despite the robustness of `try-except-finally` perspective, it can lead to verbose&mdash;every resource needs its own `try/finally` block, leading to repetitive code. Also, in case of working with multiple resources (file + socket + database connection), the code quickly becomes messy. And, obviously, the clean-up logic distracts you from the main task. 

So, we still need a cleaner, less error-prone solution...

### A 'with' statement perspective 
The concept of context manager along side with the `with` statement were introduced in Python 2.5 (2005) through [PEP 343](#pep_343). The idea is straightforward; every resource has a beginning and an end. You open it, use it, and then close it. Unlike `try/finally` where you had to write all of these steps by yourself, making sure that you never forgot the clean-up, a context manager wraps this pattern for us.

**NOTE** <br>
Originally, `open()` was just a function that returned a file object. But starting from Python 2.5, it became capable of doing more; it could be used inside `with` as a context manager.

The `with` statement simplifies this process immensely. It's cleaner and safer way to achieve the same result.
```python
# The MODERN, better way
with open('my_file.txt', 'w') as my_file:
    my_file.write('Hello, world!')

# That's it! The file is automatically closed here.
```
Once the program exits the indented block, Python automatically closes the file for you. It doesn't matter if the block finishes successfully or if an error causes it to exit&mdash;the cleanup is guaranteed. 

You can also use multiple context managers in one `with` statement (introduced in Python 3.1)
```python
with open('input.txt', 'r') as insider, open('output.txt', 'w') as outsider: 
    insider_content = insider.read() 
    outsider.write(insider_content)
```

### The answer
The best way to handle resources and context manager is to use `with` statement within `try-except` block just for more robust exception handling.
```python
try: 
    with open('data.txt', 'r') as f: 
        content = f.read()
        print(content)
except FileNotFoundError: 
    print("Error: the file doesn't exist, check the name")
except Exception as e: 
    print(f"An unexpected error occurred: {e}")
```
Here, if an error happen during `f.read()`, the program will stops but will automatically close the file as well, then the program will jump to the appropriate except block. 


## Exercises

1. Rewrite the following code using a `with` statement for file operations. Assume you need to read from `data.txt` and append its content to `log.txt`. What happens if an exception occurs during reading? 
```python
f1 = open('data.txt', 'r')
f2 = open('log.txt', 'a')
try: 
    f2.write(f1.read())
finally: 
    f1.close()
    f2.close()
```
<details>
<summary>See solution</summary>

You can make the code much cleaner and safer using a `with` statement, which lets you open multiple files in the same line.

```python
try:
    with open('data.txt', 'r') as source_file, open('log.txt', 'a') as log_file:
        log_file.write(source_file.read())
except FileNotFoundError:
    print("Error: One of the files was not found.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")

```

**What Happens if an Exception Occurs?**

This is the key advantage of using the `with` statement.

If an exception occurs inside the `with` block (for example, if `data.txt` doesn't exist, causing a `FileNotFoundError`, or if there's a disk error during the `source_file.read()` operation), **Python guarantees that both files will be automatically and properly closed**.

Here's the sequence of events:

1.  An error occurs while trying to execute `log_file.write(source_file.read())`.
2.  The program immediately stops executing the code inside the `with` block.
3.  Before propagating the error to the `except` block, the `with` statement's "cleanup" logic runs. It closes `log_file` and `source_file`.
4.  The program then jumps to the appropriate `except` block to handle the error.



</details>



## References
[<span id="pep_343">1</span>] Guido van Rossum and Alyssa Coghlan. (2005). The "with" Statement PEP 343. Python Enhancement Proposals (PEPs). https://peps.python.org/pep-0343/ <br> 
