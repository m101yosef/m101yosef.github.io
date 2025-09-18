---
title: "5. Context managers"
date: 2025-08-18
weight: 5
type: docs
tags: 
- Python
---

Up till now, we worked with variables, strings, numbers, sequences, and data structures. But hello?! We are in the age of big data! Is that everything? Well, this is not every thing; you can also work with external resources (e.g. files on disk, database connections, network sockets, and GPU sessions). So, what makes managing these external resources important? The main reason is because they are limited like non-renewable energy sources. Also, if you forget to release them, your program can slow down or crash. 

## Different ways to handle resources
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
The early Python coders were just like; they also don't like being in a town of problems. As a solution, early Python developers introduced a more reliable mechanism: the `try...finally` block. The key idea is that the finally clause always executes, no matter what happens&mdash;whether your code runs successfully, raises an exception, or even returns early. 

```python
# 1. Acquire the resource
# We open the file and get a file handle.
f = open('my_report.txt', 'w')
try:
    # 2. Use the resource
    # We perform our operations inside the 'try' block.
    print("Trying to write to the file...")
    f.write('This is the first line.\n')
    
    # Let's simulate an error.
    # Uncommenting the next line will cause a ZeroDivisionError.
    # result = 1 / 0
    
    f.write('This is the second line.\n')
    print("Finished writing successfully.")
finally:
    # 3. Release the resource
    # This block is GUARANTEED to run, whether an error occurred or not.
    print("Executing finally block: Closing the file.")
    f.close()

print(f"\nIs the file closed? {f.closed}")
```
If you run this code as is, it works perfectly. You'll see the "Trying", "Finished", and "finally" messages. Now, uncomment the `result = 1 / 0` line and run it again. The program will crash with a `ZeroDivisionError`, but notice the output: the "Executing finally block" message still prints right before the error traceback. The file is safely closed. This is the guarantee in action.

<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> secure a file via <code>try...finally</code>
</div>

Your task is to write a script that creates a file named `user_input.txt`. It should prompt the user for their name and write "Hello, [Name]" to the file. Use a `try...finally` block to ensure the file is always closed. Test it by running the script and hitting `Ctrl+C` at the prompt, which raises a `KeyboardInterrupt` exception. You should see your "closing file" message print even when the program is interrupted. 

<details>
<summary>hint</summary>

Remember to initialise the file variable to `None` before the `try` block to avoid a `NameError` if `open()` fails. Your `finally` block will need to check if the variable is still `None` before trying to close it.

</details>


<details>
<summary>solution</summary>

```python
# Acquire the file handle first
f = None # Initialize to None to avoid NameError if open() fails
try:
    f = open('user_input.txt', 'w')
    # Use the resource inside the try block
    name = input("Please enter your name: ")
    f.write(f"Hello, {name}\n")
    print("Wrote to file successfully.")
except KeyboardInterrupt:
    print("\nOperation cancelled by user.")
finally:
    # Release the resource inside the finally block
    # We must check if 'f' was successfully opened before closing it
    if f:
        print("Closing the file.")
        f.close()

# Note: The solution above shows the more complex, truly safe version 
# that checks if 'f' exists, highlighting the verbosity of this pattern.
```

</details>


</div>


**Final thoughts**
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

<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> convert to <code>with</code>
</div>

Your task is to refactor the `try...finally` code from [practical exercise 1](practical-exercise-1) to use a `with` statement. The functionality should be identical, but your new code should be significantly cleaner and more robust.

<details>
<summary>hint</summary>

You will need a `try...except KeyboardInterrupt` block around your `with` statement. The `with` statement handles the file, the `try...except` handles the user interruption.

</details>


<details>
<summary>solution</summary>

```python
try:
    # The with statement handles opening and closing the file.
    with open('user_input.txt', 'w') as f:
        name = input("Please enter your name: ")
        f.write(f"Hello, {name}\n")
        print("Wrote to file successfully.")
except KeyboardInterrupt:
    print("\nOperation cancelled by user.")

# Note how we no longer need to check if the file is open before closing.
# The 'with' statement handles all of that automatically.
```

</details>

</div>

## Context managers + exception handling
The best way to handle resources and context manager is to use `with` statement within `try-except` block just for more robust exception handling. This is a perfect example of the "separation of concerns" principle in software design. 
- The `with` statement's concern is resource lifetime management. It ensures that resource's "exit" action is reliably called.
- The `try...except` statement's concern is error handling. It provides a way for the program to react to exceptions gracefully instead of crashing. 

So, you can say that `with` statement alone does not handle or suppress exceptions. If an error occurs inside `with` block, the context manager cleans up the resource, and then the exception continues to propagate up the call stack. If it isn't caught by a `try...except` block, your program will terminate. 


```python
# ------------ What could go wrong? ------------------
# The file 'data.txt' might not exist (FileNotFoundError).
# The file might contain text like "hello" instead of a number (ValueError).
# The file might contain the number 0 (ZeroDivisionError).
# -----------------------------------------------------

try:
    # 'with' handles the file resource
    with open('data.txt', 'r') as f:
        line = f.readline()
        # 'try...except' handles potential errors from the 'Use' phase
        value = int(line.strip()) 
        reciprocal = 100 / value
        print(f"The result is: {reciprocal}")

except FileNotFoundError:
    print("Error: The data file could not be found.")
except ValueError:
    print("Error: The file contains non-numeric data and cannot be converted to an integer.")
except ZeroDivisionError:
    print("Error: The value in the file is 0, and division by zero is not allowed.")
except Exception as e:
    # A general catch-all for any other unexpected errors
    print(f"An unexpected error occurred: {e}")
```
Here, the `with` statement guarantees that `data.txt` will be closed, no matter which of the potential errors occurs. The series of `except` blocks allows our program to provide a specific, helpful error message for each failure case instead of just crashing. This is the hallmark of a well-engineered program. 


<div class="exercise">
<div id="practical-exercise-3" class="exercise-head">
<b>Practical exercise 3:</b> data processing
</div>

Create a file named `numbers.txt` and add the following lines: 
```plaintext
10
5
0
oops
2
```
Write a Python script that reads this file line by line. For each line, it should try to convert the text to an integer and print its reciprocal (1/number). Your script must: 
1. Use a `with` statement to handle the file
2. Use a `try...except` block inside the loop to handle potential `ValueError` and `ZeroDivisionError` exceptions for each line. 
3. If an error occurs for a specific line, it should print a helpful message and then continue to the next line. 

<details>
<summary>hint</summary>

You will need a nested structure: an outer `try...except` for `FileNotFoundError`, a `with` statement inside that, a `for` loop inside the `with` block, and an inner `try...except` inside the `for` loop to handle the per-line errors.

</details>


<details>
<summary>solution</summary>

```python
filename = 'numbers.txt'
try:
    with open(filename, 'r') as f:
        for line_num, line in enumerate(f, 1):
            # Strip whitespace from the line
            clean_line = line.strip()
            try:
                # This is the 'risky' part that needs its own try...except
                number = int(clean_line)
                reciprocal = 1 / number
                print(f"Line {line_num}: Reciprocal of {number} is {reciprocal}")
            except ValueError:
                print(f"Line {line_num}: Could not convert '{clean_line}' to an integer. Skipping.")
            except ZeroDivisionError:
                print(f"Line {line_num}: Cannot calculate reciprocal of 0. Skipping.")
except FileNotFoundError:
    print(f"Error: The file '{filename}' was not found.")
```

</details>
</div>

## Context managers applications
Think of the `with` statement as a universal key card reader. The reader itself is simple; it just knows how to engage and disengage a lock. You can design many different kinds of key cards to work with it. One key card might be for a simple office door (opening and closing a file). Another might be for a high-security bank vault, requiring a complex multi-step locking and alarm-setting procedure (managing a database transaction). A third might be for a temporary locker that automatically clears its contents when you leave (managing a temporary directory). 
 `with` statement is the reader; the object you use it with are the key cards. 

### Application 1: Module as data
A Python file (`.py`) has a fascinating dual identity. On the one hand, it is a simple text file whose contents you can read and write. On the other hand, it is a module of executable code that the Python interpreter can import and run. Understanding this duality is key to building more complex applications, and context managers help us master the first identity. 

Think of a module like a specialised toolbox. Instead of putting all your tools (functions, variables, classes) in one giant, messy pile, you organise them into smaller toolboxes based on the purpose. One might have all your tools for doing maths (`math_module.py`) and another for working with text (`text_tools.py`). So, when you need a specific tool, you just grab the right toolbox by importing it into your main script. 

Let's see the process of writing, reading, and importing a module. We will programmatically create a Python module, then read its contents as plain text, and finally import it to use its functionality. 

```python
import os

# Define the filename for our new module
module_name = 'math_utils.py'

# Define the Python code we want to write into the file
# Using triple quotes allows us to write a multi-line string easily
module_content = """
# This is a simple utility module created programmatically.

def add(a, b):
    \"\"\"This function returns the sum of two numbers.\"\"\"
    return a + b

def subtract(a, b):
    \"\"\"This function returns the difference between two numbers.\"\"\"
    return a - b

print(f"Module '{__name__}' was imported.")
"""

# --- Step 1: Write the recipe (Treating the .py file as data) ---
# We use a 'with' statement to safely create and write to the file.
print(f"--- Writing content to {module_name} ---")
with open(module_name, 'w') as f:
    f.write(module_content)
print(f"Successfully created {module_name}.\n")


# --- Step 2: Read the recipe (Still treating the .py file as data) ---
# We can also use 'with' to read its contents back as plain text.
print(f"--- Reading content from {module_name} as plain text ---")
with open(module_name, 'r') as f:
    read_content = f.read()
    print(read_content)


# --- Step 3: Cook with the recipe (Treating the .py file as code) ---
# Now, we use the 'import' statement to execute the file as a module.
print(f"--- Importing {module_name} as a module ---")
import math_utils

# Now we can use the functions defined inside our created module.
sum_result = math_utils.add(10, 5)
diff_result = math_utils.subtract(10, 5)

print("\n--- Using the imported functions ---")
print(f"Result of math_utils.add(10, 5) is: {sum_result}")
print(f"Result of math_utils.subtract(10, 5) is: {diff_result}")


# --- Final Step: Clean up the created file ---
# It's good practice to remove temporary files.
# Using 'finally' ensures this runs even if the import fails.
try:
    pass # Main logic is above
finally:
    if os.path.exists(module_name):
        os.remove(module_name)
        print(f"\nCleaned up and removed {module_name}.")
```
In this single script, the `with` statement gave us safe, reliable access to `math_utils.py` as a text file, allowing us to create and inspect it. Then, the `import` statement switched its identity, treating it as a source of live, usable functions.


<div class="exercise">
<div id="practical-exercise-4" class="exercise-head">
<b>Practical exercise 4:</b> create and use helper module
</div>

Your task is to programmatically create and then use a simple string manipulation module. 
1. Create a Python file named `string_helpers.py`
2. Using a `with` statement, write a single function into this file called `reverse_string(s)` that takes sting `s` and returns its reversed version. 
3. In the same script, `import` the `string_helpers` module you just created. 
4. Call the `reverse_string` function with a sample text (e.g., "Hello Python") and print the result.
5. Ensure you clean up the `string_helpers.py` file at the end. 

<details>
<summary>hint</summary>

You can reverse a string in Python using slice notation: `my_string[::-1]`. First, focus on writing the file content to `string_helpers.py`. Then, in the same script, add the `import` statement and call the function. Don't forget to clean up the created file.

</details> 

<details>
<summary>solution</summary>

```python
import os

module_name = 'string_helpers.py'
module_code = """
def reverse_string(s):
    \"\"\"Returns the reversed version of a string.\"\"\"
    return s[::-1]
"""

# 1. Write the function to the file using a context manager
try:
    with open(module_name, 'w') as f:
        f.write(module_code)
    print(f"Module '{module_name}' created successfully.")

    # 2. Import the newly created module
    import string_helpers

    # 3. Use the function from the module
    original_text = "hello world"
    reversed_text = string_helpers.reverse_string(original_text)
    
    print(f"Original: '{original_text}'")
    print(f"Reversed: '{reversed_text}'")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    # 4. Clean up the file
    if os.path.exists(module_name):
        os.remove(module_name)
        print(f"Module '{module_name}' has been cleaned up.")
```

</details>
</div>


### Application 2: Zipped Archives
The `zipfile` module is Python's standard tool for working with `.zip` archives. A ZIP archive is a resource or a container that must be opened and properly closed to ensure its internal structure and data are not corrupted. Naturally, the `zipfile.ZipFile` object is a context manager. 

```python
import zipfile
import os

# First, let's create a dummy archive to work with
with open('file1.txt', 'w') as f: f.write('This is file one.')
with open('file2.txt', 'w') as f: f.write('This is file two.')

with zipfile.ZipFile('my_archive.zip', 'w') as archive:
    archive.write('file1.txt')
    archive.write('file2.txt')

# Now, let's safely read from the archive
try:
    with zipfile.ZipFile('my_archive.zip', 'r') as archive:
        print("Files inside my_archive.zip:")
        # .printdir() is a handy method to list the contents
        archive.printdir()
        
        print("\n--- Reading file1.txt from within the archive ---")
        # You can even open a file *within* the archive as another context manager!
        with archive.open('file1.txt') as internal_file:
            content = internal_file.read()
            # Content is read as bytes, so we decode it to a string
            print(content.decode('utf-8'))
except zipfile.BadZipFile:
    print("Error: The file is not a valid zip archive.")
except FileNotFoundError:
    print("Error: my_archive.zip not found.")
finally:
    # Clean up the dummy files
    if os.path.exists('file1.txt'): os.remove('file1.txt')
    if os.path.exists('file2.txt'): os.remove('file2.txt')
    if os.path.exists('my_archive.zip'): os.remove('my_archive.zip')
```

<div class="exercise">
<div id="practical-exercise-5" class="exercise-head">
<b>Practical exercise 5:</b> inspect a ZIP archive
</div>

Your task is to create a ZIP file named `documents.zip` containing at least two text files. Then, write a Python script that uses a `with` statement to open this archive and prints the names of all the files it contains using the `.namelist()` method, which returns a simple list of filenames. 

<details>
<summary>hint</summary>

You will need to use `zipfile.ZipFile` in write mode (`&#39;w&#39;`) first to create the archive, and then again in read mode (`&#39;r&#39;`) to inspect it. Don't forget to create the dummy text files to add to the archive.

</details>


<details>
<summary>solution</summary>

```python
import zipfile
import os

# --- Step 1: Create the ZIP file ---
archive_name = 'documents.zip'
files_to_add = ['report.txt', 'notes.txt']

# Create dummy files
with open(files_to_add[0], 'w') as f: f.write("This is the annual report.")
with open(files_to_add[1], 'w') as f: f.write("Meeting notes.")

# Create the archive using a context manager
with zipfile.ZipFile(archive_name, 'w') as zipf:
    for file in files_to_add:
        zipf.write(file)
print(f"'{archive_name}' created successfully.")

# --- Step 2: Inspect the ZIP file ---
print("\nInspecting the archive...")
try:
    with zipfile.ZipFile(archive_name, 'r') as zipf:
        # .namelist() returns a list of all file names in the archive
        file_list = zipf.namelist()
        print("Files found in the archive:", file_list)
except FileNotFoundError:
    print(f"Error: Could not find '{archive_name}'.")
finally:
    # --- Step 3: Clean up ---
    for file in files_to_add:
        if os.path.exists(file): os.remove(file)
    if os.path.exists(archive_name): os.remove(archive_name)
```

</details>
</div>


## References
[<span id="pep_343">1</span>] Guido van Rossum and Alyssa Coghlan. (2005). The "with" Statement PEP 343. Python Enhancement Proposals (PEPs). https://peps.python.org/pep-0343/ <br> 
