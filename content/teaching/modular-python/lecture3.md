---
title: "3. Core data structures"
date: 2025-08-11
weight: 3
type: docs
tags: 
- Python
---

We've just saw the power of sequences and how the simple choice of the sequence type affects the performance significantly. Here, I'll also take you in the same journey but with more complicated data structures that are built above sequences. And, the idea behind all of that is to give you the base knowledge to take a solid choices on the data type / data structure you will use. So, as always, we are not going to only see the how of each data structure work, but also we will go deep and discover why and when to use each. 

## Dictionaries
Yes, it is the same like the language dictionary you use. Back in secondary school, more specifically in Arabic studies, it was essential to find the grammatical root of a word to be able to look it up in a dictionary. The idea here is the same, Python dictionary gives every value (word in Arabic dictionary) a label (grammatical root) to make it easier and faster to retrieve data. Clearly, it is more complicated than a container sequence like normal pythonic `list`. Obviously, because we are storing and additional info about our data/values which is label/key. But this complexity comes functionality; with dictionaries you can find values easily and clearly by using the label/key. Since, I'm a data scientist myself, I can say that the living core example of dictionaries is the spreadsheet

<figure id="fig:simple-spreadsheet">
  <img src="../images/simple-spreadsheet.png">
</figure>

```python
# Simple spreadsheet with Dictionary

simple_spreadsheet = {
    "Name": "Mohamed", 
    "Age": 23,
    "City": "Mansoura",
    "Occupation": "Researcher"
}
```

We simple is good but we want to fulfil the basic human desire "TO GO BIGGER". So, instead of having a simple spreadsheet with only one row after the labels row. We will work on a bigger spreadsheet with multiple rows. In this case, we have two options. The first is to use a dictionary of lists where each key represents a label and the value is a list of all the data in that column. The second is to use a list of dictionaries where each dictionary represents a row in the spreadsheet. 

<figure id="fig:spreadsheet2">
  <img src="../images/spreadsheet2.png">
</figure>

```python
# Option 1: Dictionary of lists
spreadsheet2 = {
    "Name": ["Mohamed", "Yasser", "Salah", "Waleed"], 
    "Age": [23, 45, 31, 26],
    "City": ["Mansoura", "Tanta", "Port Said", "Cairo"],
    "Occupation": ["Researcher", "Professor", "Doctor", "Athlete"]
}

# Option 2: List of dictionaries
spreadsheet2 = [
    {"Name": "Mohamed", "Age": 23, "City": "Mansoura", "Occupation": "Researcher"},
    {"Name": "Yasser", "Age": 45, "City": "Tanta", "Occupation": "Professor"},
    {"Name": "Salah", "Age": 31, "City": "Port Said", "Occupation": "Doctor"},
    {"Name": "Waleed", "Age": 26, "City": "Cairo", "Occupation": "Athlete"}
]
```

Here, both options are valid and can be used to represent the same data. However, the choice between the two depends on the specific use case. Okay, just like you, I hate when someone say specific uses or something like that. So, let's put it clear, if you need to access data by column, then the first option is more suitable. On the other hand, if you need to access data by row, then the second option is more suitable. 

### Dictionary mechanics
1. You can retrieve the values using the keys inside square brackets `[]` or using the `get` method. The difference between the two is that if you try to access a key that doesn't exist using square brackets, it will raise a `KeyError`. However, if you use the `get` method, it will return `None` or a default value if provided.

```python
# Accessing values using square brackets
simple_spreadsheet = {
    "Name": "Mohamed", 
    "Age": 23,
    "City": "Mansoura",
    "Occupation": "Researcher"
}
print(simple_spreadsheet["Name"])  # Output: Mohamed

# Using get method
print(simple_spreadsheet.get("Age"))  # Output: 23
print(simple_spreadsheet.get("Country", "Not Found"))  # Output: Not Found
```

2. You can add or update key-value pairs by simply assigning a value to a key. If the key already exists, it will update the value. If the key doesn't exist, it will add a new key-value pair.

```python
# Adding a new key-value pair
simple_spreadsheet["Country"] = "Egypt"
print(simple_spreadsheet)
```
```
{'Name': 'Mohamed', 'Age': 23, 'City': 'Mansoura', 'Occupation': 'Researcher', 'Country': 'Egypt'}
```

3. You can remove key-value pairs using the `del` statement or the `pop` method. The `del` statement will remove the key-value pair and raise a `KeyError` if the key doesn't exist. The `pop` method will remove the key-value pair and return the value. If the key doesn't exist, it will raise a `KeyError` unless a default value is provided.

```python
# Removing a key-value pair using del
del simple_spreadsheet["Country"]
print(simple_spreadsheet)
```
```
{'Name': 'Mohamed', 'Age': 23, 'City': 'Mansoura', 'Occupation': 'Researcher'}
```

```python
# Removing a key-value pair using pop
age = simple_spreadsheet.pop("Age")
print(age)  # Output: 23
print(simple_spreadsheet)
```
```
23
{'Name': 'Mohamed', 'City': 'Mansoura', 'Occupation': 'Researcher'}
```

4. You can check if a key exists in the dictionary using the `in` keyword.

```python
# Checking if a key exists
print("Name" in simple_spreadsheet)  # Output: True

# Loops through keys, values, and items
for key in simple_spreadsheet:
    print(key, simple_spreadsheet[key])
    # output: Name City Occupation

for value in simple_spreadsheet.values():
    print(value)
    # output: Mohamed Mansoura Researcher

for key, value in simple_spreadsheet.items():
    print(key, value)
```

Output of the last loop: 
```
Name Mohamed
City Mansoura  
Occupation Researcher
```

5. You can use `next` and `iter` to manually iterate through the keys of the dictionary. This is useful when you want to have more control over the iteration process.

```python
# Iterating through keys using next and iter
dict_iterator = iter(simple_spreadsheet)
print(next(dict_iterator))  # Output: Name
print(next(dict_iterator))  # Output: City
print(next(dict_iterator))  # Output: Occupation
```

### Hashing 
This is the origin of Python dictionaries&mdash;hash tables. A hash table is an array of buckets where each bucket can hold multiple key-value pairs. When you add a key-value pair to a dictionary, Python computes a hash value for the key using a hash function. This hash value is then used to determine the index of the bucket where the key-value pair will be stored.

<figure id="fig:hash-table">
  <img src="../images/hash-table.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>An illustration of a hash function mapping keys to indices within a hash table. String keys (e.g., 'John Smith') are transformed by the hash function into an integer index (e.g., 01), which points to the storage location for the associated value (a telephone number). Source: <a href="https://en.wikipedia.org/wiki/Hash_table">Wikipedia</a></figcaption>
</figure>

When you want to retrieve a value from the dictionary using a key, Python computes the hash value for the key again and uses it to find the appropriate bucket. It then searches through the bucket to find the key-value pair and returns the value.



<div class="exercise">
<div id="practical-exercise-1" class="exercise-head">
<b>Practical exercise 1:</b> words count exercise 
</div>

Count how many times each word appears in a given text. Use a dictionary to store the word counts.

```python 
text_to_analyse = """
Learning Python is a journey. The best way to accelerate that 
learning is by building, and the best way to learn data structures is 
to use them. A dictionary is a fundamental data structure in Python.
"""
```
Steps to follow:
1. Prepare the text
    - convert the entire string to lowercase to ensure that "Learning" and "learning" are treated as the same word.
    - remove punctuation to ensure that words like "Python." and "Python" are treated as the same word.
    - split the text into individual words using the `split` method.
2. Count the words
    - Create an empty dictionary to store the word counts.
    - Loop through each word in the list of words.
    - For each word, check if it is already in the dictionary.
        - If it is, increment its count by 1.
        - If it is not, add it to the dictionary with a count of 1.

3. Display the results
    - After the loop has finished, print the dictionary to see the word counts.

<details>
<summary>solution</summary>

```python
text_to_analyse = """
Learning Python is a journey. The best way to accelerate that 
learning is by building, and the best way to learn data structures is 
to use them. A dictionary is a fundamental data structure in Python.
"""

# 1. Prepare the text
cleaned_text = text_to_analyse.lower().replace('\n', '').replace('.', '').replace(',', '')
words = cleaned_text.split() # .split() handles splitting by spaces and newlines

# 2. Count the words using a dictionary
word_counts = {}
for word in words:
    # .get(word, 0) will fetch the current count of the word.
    # If the word isn't in the dictionary, it returns the default value, 0.
    # We then add 1 to this result and update the dictionary.
    word_counts[word] = word_counts.get(word, 0) + 1

# 3. Display the result
print(
    "Word Frequency Analysis:", 
    word_counts, 
    sep="\n"
    )
```

```
Word Frequency Analysis:
{'learning': 2, 'python': 2, 'is': 3, 'a': 2, 'journey': 1, 'the': 2, 'best': 2, 'way': 2, 'to': 2, 'accelerate': 1, 'that': 1, 'by': 1, 'building': 1, 'and': 1, 'learn': 1, 'data': 2, 'structures': 1, 'use': 1, 'them': 1, 'dictionary': 1, 'fundamental': 1, 'structure': 1, 'in': 1}
```

</details>
</div>


<div class="exercise">
<div id="practical-exercise-2" class="exercise-head">
<b>Practical exercise 2:</b> Social network
</div>

You have raw data representing users and their friends on a small social network. Your task is to structure this data and find mutual connections. 

```python
user_data = {
    "Alice": ["Bob", "Charlie", "David"],
    "Bob": ["Alice", "Eve", "Frank"],
    "Charlie": ["Alice", "Frank"],
    "David": ["Alice"],
    "Eve": ["Bob"],
    "Frank": ["Bob", "Charlie"]
}
```

Your task is to: 
- Verify he integrity of the friend lists. For example, if Alice is friends with Bob, Bob should be friends with Alice. Your current data structure is a good start, but think about how you might represent each user's friend list for fast lookups.
- Write a function called `find_mutual_friends(user1, user2)` that takes two usernames and return a collection of friends they have in common. 
- Demonstrate your function by finding the mutual friends between "Alice" and "Bob", and between "Charlie" and "David".


<details>
<summary>hint</summary>
ne data structure is excellent for storing key-value pairs like usernames and their details. Another is specifically optimised for finding commonalities (intersections) between two collections.
</details>


<details>
<summary>solution</summary>

```python
# --- Data Provided ---
user_data = {
    "Alice": ["Bob", "Charlie", "David"],
    "Bob": ["Alice", "Eve", "Frank"],
    "Charlie": ["Alice", "Frank"],
    "David": ["Alice"],
    "Eve": ["Bob"],
    "Frank": ["Bob", "Charlie"]
}

def find_mutual_friends(user1, user2, data):
    """
    Finds mutual friends between two users.

    Args:
        user1 (str): The name of the first user.
        user2 (str): The name of the second user.
        data (dict): The dictionary containing user friend lists.

    Returns:
        set: A set of usernames that are mutual friends. Returns an empty set if users are not found.
    """
    # Retrieve the friend lists from the dictionary. Use .get() to avoid errors if a user doesn't exist.
    friends1 = data.get(user1, [])
    friends2 = data.get(user2, [])

    # Convert the lists to sets. This is the key step.
    # Sets are optimised for mathematical operations like intersection.
    set1 = set(friends1)
    set2 = set(friends2)

    # Find the intersection of the two sets to get mutual friends.
    # The '&' operator is a concise way to do this.
    mutuals = set1 & set2
    
    return mutuals

# --- Demonstration ---
if __name__ == "__main__":
    # Find the mutual friends between Alice and Bob
    mutuals_ab = find_mutual_friends("Alice", "Bob", user_data)
    print(f"Mutual friends between Alice and Bob: {mutuals_ab}")

    # Find the mutual friends between Bob and Charlie
    mutuals_bc = find_mutual_friends("Bob", "Charlie", user_data)
    print(f"Mutual friends between Bob and Charlie: {mutuals_bc}")
```

```
Mutual friends between Alice and Bob: set()
Mutual friends between Bob and Charlie: {'Frank'}
```

</details>
</div>

## Sets 
Like mathematical sets, Python sets are unordered collections of unique items. So, if you try to add a duplicate item to a set, it will be ignored. Sets are useful when you don't need to maintain the order of items and without duplicates. They are also useful when you find the need to perform mathematical set operations like union, intersection, and difference. 

```python
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 5, 1, 3, 2]
unique_numbers = set(numbers)
print(unique_numbers) 
```

```
{1, 2, 3, 4, 5}
```

**Set mechanics**
1. Items can be added and removed using the `add` and `remove` methods. If you try to remove an item that doesn't exist, it will raise a `KeyError`. However, you can use the `discard` method which will not raise an error if the item doesn't exist.

```python
# Adding items to a set
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)  # Output: {1, 2, 3, 4}

# Removing items from a set
my_set.remove(2)
print(my_set)  # Output: {1, 3, 4}

my_set.discard(5)  # No error even though 5 is not in the set
print(my_set)  # Output: {1, 3, 4}
```

2. You can do fast membership testing using the `in` keyword. For large collections, checking for an item's presence in a set is significantly faster than checking for it in a list. 

```python
# Membership testing
print(3 in my_set)  # Output: True
print(5 in my_set)  # Output: False
```

3. You can perform mathematical set operations like union, intersection, difference, and symmetric difference using methods or operators.

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

# Union
print(set_a | set_b)  # Output: {1, 2, 3, 4, 5}
print(set_a.union(set_b))  # Output: {1, 2, 3, 4, 5}

# Intersection
print(set_a & set_b)  # Output: {3}
print(set_a.intersection(set_b))  # Output: {3}

# Difference
print(set_a - set_b)  # Output: {1, 2}
print(set_a.difference(set_b))  # Output: {1, 2}
```


<div class="exercise">
<div id="practical-exercise-3" class="exercise-head">
<b>Practical exercise 3:</b> Analysing skills exercise 
</div>

Imagine you are a technical recruiter analysing the programming skills of two candidates, Ali and Sara. You have their skills listed, but the data is messy since it contains duplicates. Your task is to clean the data and find out which skills they share and which are unique to each candidate. 

```python
# Skills for Ali 
ali_skills = ["Python", "Data Analysis", "Machine Learning", "Python", "SQL"]

# Skills for Sara
sara_skills = ["R", "SQL", "Data Visualization", "Python", "R"]
```

Steps to follow:
1. Clean the data by converting the lists of skills into sets to remove duplicates.
2. Find shared skills using the intersection operation.
3. Find all skills that both have by using the union operation.
4. Find unique skills for each candidate using the difference operation.


<details>

<summary>solution</summary>

```python
# Raw skill lists
ali_skills = ['Python', 'Data Analysis', 'Machine Learning', 'Python', 'SQL']
sara_skills = ['R', 'SQL', 'Data Visualisation', 'Python', 'R']

# 1. Create clean, unique skill sets
ali_unique_skills = set(ali_skills)
sara_unique_skills = set(sara_skills)

print(
    f"Ali's unique skills: {ali_unique_skills}", 
    f"Sara's unique skills: {sara_unique_skills}", 
    "-" * 20,    # Just a separator line
    sep="\n"
    )

# 2. Find shared skills (intersection)
common_skills = ali_unique_skills.intersection(sara_unique_skills)
# Alternative using the '&' operator: common_skills = ali_unique_skills & sara_unique_skills
print(f"Common skills: {common_skills}")

# 3. Find all unique skills (union)
all_skills = ali_unique_skills.union(sara_unique_skills)
# Alternative using the '|' operator: all_skills = ali_unique_skills | sara_unique_skills
print(f"All skills combined: {all_skills}")

# 4. Find skills unique to ali (difference)
ali_only_skills = ali_unique_skills.difference(sara_unique_skills)
# Alternative using the '-' operator: ali_only_skills = ali_unique_skills - sara_unique_skills
print(f"Skills only ali has: {ali_only_skills}")
```

```
Ali's unique skills: {'Data Analysis', 'Machine Learning', 'SQL', 'Python'}
Sara's unique skills: {'R', 'Data Visualisation', 'SQL', 'Python'}
--------------------
Common skills: {'SQL', 'Python'}
All skills combined: {'Data Visualisation', 'R', 'Data Analysis', 'Machine Learning', 'SQL', 'Python'}
Skills only Ali has: {'Data Analysis', 'Machine Learning'}
```

</details>
</div>

## Stacks
Look, a stack is not a distinct data type in Python in the same way that a list or dictionary is. Rather, a stack is a conceptual data structure that defined by a specific set of rules for handling data and can be implemented using other data types, most commonly lists. A stack follows the Last In, First Out (LIFO) principle, meaning that the last item added to the stack is the first one to be removed. You can think of a stack like a stack of plates; you add new plates to the top and remove plates from the top.

<figure id="fig:stack">
  <img src="../images/stack.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>An illustration of the primary operations of a stack data structure. The 'push' operation (left) adds an element ('C') to the top of the stack, while the 'pop' operation (right) removes the most recently added element. This demonstrates the stack's fundamental Last-In, First-Out (LIFO) principle. (Source: <a href="https://www.geeksforgeeks.org/dsa/stack-meaning-in-dsa/">GeeksforGeeks</a>)</figcaption>
</figure>

**Stack mechanics**
1. You can add items to the stack using the `append` method of a list. This adds the item to the top of the stack.

```python
# Creating a stack using a list
stack = []
stack.append(1)
stack.append(2)
stack.append(3)

print(stack)  # Output: [1, 2, 3]
```

2. You can remove items from the stack using the `pop` method of a list. This removes and returns the item from the top of the stack.

```python
# Removing items from the stack
top_item = stack.pop()
print(top_item)  # Output: 3
print(stack)  # Output: [1, 2]
```

<div class="exercise">
<div id="practical-exercise-4" class="exercise-head">
<b>Practical exercise 4:</b> The "undo" button exercise
</div>

We will simulate a very basic text editor that supports typing and undoing actions. The editor will maintain a stack of actions to allow users to undo their last action.

Steps to follow:
1. Create a variable called `document` and set it to an empty string. This will represent the text in the editor.
2. Create an empty list called `undo_stack` to keep track of the actions performed.
3. You will perform a series of actions and you need to manually manage the document and the `undo_stack`.
    - Action 1: type "Hello". Append "Hello" to the document and push the action onto the `undo_stack`.
    - Action 2: type " World". Append " World" to the document and push the action onto the `undo_stack`.
    - Action 3: undo last action. Pop the last action from the `undo_stack` and remove the corresponding text from the document.

<details>
<summary>solution</summary>

```python
# 1. Initial Setup
document = ""
undo_stack = []

print(f"Start: Document is '{document}', Stack is {undo_stack}")

# --- Action 1: Add "Hello" ---
# Push the current state "" onto the stack
undo_stack.append(document)
# Perform the action
document += "Hello"
print(f"Added 'Hello': Document is '{document}', Stack is {undo_stack}")

# --- Action 2: Add " World" ---
# Push the current state "Hello" onto the stack
undo_stack.append(document)
# Perform the action
document += " World"
print(f"Added ' World': Document is '{document}', Stack is {undo_stack}")

print("\n--- UNDO ---")

# --- Action 3: User presses "Undo" ---
if undo_stack: # Check if the stack is not empty
    # Pop the last state "Hello" and restore it
    document = undo_stack.pop()
    print(f"Undo: Document is '{document}', Stack is {undo_stack}")
else:
    print("Nothing to undo.")
```

```
Start: Document is '', Stack is []
Added 'Hello': Document is 'Hello', Stack is ['']
Added ' World': Document is 'Hello World', Stack is ['', 'Hello']

--- UNDO ---
Undo: Document is 'Hello', Stack is ['']
```


</details>
</div>


## Queues
Similar to a stack, a queue is a conceptual data structure that can be implemented using other data types, most commonly lists or the `collections.deque` class. A queue follows the First In, First Out (FIFO) principle, meaning that the first item added to the queue is the first one to be removed. You can think of a queue like a line of people waiting to enter a concert; the first person in line is the first to enter. 


<figure id="fig:queue">
  <img src="../images/queue.png">
  <figcaption align="center" style="color: gray; "><strong>Fig: </strong>A real-world illustration of the queue data structure. A checkout line in a shop exemplifies the First-In, First-Out (FIFO) principle, where individuals are served in the sequence of their arrival. This is directly analogous to how elements are added ('enqueued') to the back and removed ('dequeued') from the front in a computational queue. (Source: <a href="https://codefinity.com/courses/v2/212d3d3e-af15-4df9-bb13-5cbbb8114954/3a2558c0-2edb-4b98-a8d6-88b105cbcdda/126bf1eb-5380-4517-b488-f6f209d56675">CodeFinity</a>)</figcaption>
</figure>

### Queue mechanics
1. You can add items to the queue using the `append` method of a list or the `append` method of a `deque`. This adds the item to the end of the queue.

```python
# Creating a queue using a list
queue1 = []
queue1.append(1)
queue1.append(2)
queue1.append(3)

print(queue)  # Output: [1, 2, 3]

# Creating a queue using deque  
from collections import deque
queue2 = deque()
queue2.append(1)
queue2.append(2)
queue2.append(3)

print(queue2)  # Output: deque([1, 2, 3])
```

2. You can remove items from the queue using the `pop(0)` method of a list or the `popleft` method of a `deque`. This removes and returns the item from the front of the queue.

```python
# Removing items from the queue using a list
front_item = queue1.pop(0)
print(front_item)  # Output: 1
print(queue1)  # Output: [2, 3]

# Removing items from the queue using deque
front_item = queue2.popleft()
print(front_item)  # Output: 1
print(queue2)  # Output: deque([2, 3])
```

### The hidden cost of shuffling
You see that using a list to implement a queue is functionally correct, but it carries a hidden performance cost that becomes significant as the queue grows. The `pop(0)` operation is not as simple as it looks.

Behind the scenes, when you call `pop(0)` on a list, Python has to remove the first element and then shift all the other elements one position to the left to fill the gap. This shifting operation takes time proportional to the number of elements in the list. So, if you have a large list and you frequently remove items from the front, this can lead to performance issues.

This is why the `collections.deque` class is preferred for implementing queues. The `deque` (double-ended queue) is designed to allow fast appends and pops from both ends. When you use `popleft()` on a `deque`, it can remove the first element without needing to shift all the other elements, making it much more efficient for queue operations.



<div class="exercise">
<div id="practical-exercise-5" class="exercise-head">
<b>Practical exercise 5:</b> Printer queue
</div>

Your goal is to simulate a simple printer queue system. You will manage a queue of print jobs, allowing users to add new jobs and process (print) the next job in line.

Steps to follow:
1. Import the `deque` class from the `collections` module.
2. Create an empty `deque` called `printer_queue` to hold the print jobs.
3. Imagine three different users send jobs to the printer. Add the following file names to your `printer_queue` one by one using the `.append()` method. 
    - `report.docx`
    - `photo.png`
    - `presentation.pptx`
4. After adding all the jobs, print the `printer_queue` to see its current state.
5. Now, simulate the printer working through the jobs. Write a `while` loop that continues as long as the `printer_queue` is not empty. Inside the loop: 
    - remove the jobs from the front of the queue using the `.popleft()` method. Store it in a variable called `current_job`.
    - print a message indicating which job is currently being printed like `Printing: report.docx`.
    - print the current state of the `printer_queue` after each job is processed.
    - After the loop, print a message indicating that all jobs have been printed.


<details>
<summary>solution</summary>


```python
from collections import deque

# 1. Setup
printer_queue = deque()
print(f"Printer is ready. Queue is currently: {printer_queue}")

# 2. Simulate adding jobs (enqueue)
print("\nUsers are sending documents to print...")
printer_queue.append('report.docx')
print(f"Added 'report.docx'. Queue is now: {printer_queue}")

printer_queue.append('photo.png')
print(f"Added 'photo.png'. Queue is now: {printer_queue}")

printer_queue.append('presentation.pptx')
print(f"Added 'presentation.pptx'. Queue is now: {printer_queue}")

print("\n--- Starting to process print jobs ---")

# 3. Process the jobs (dequeue)
while printer_queue:
    current_job = printer_queue.popleft()
    print(f"Printing: {current_job}")
    print(f"    Remaining jobs in queue: {printer_queue}")

print("\nAll print jobs are complete.")
```
```
Printer is ready. Queue is currently: deque([])

Users are sending documents to print...
Added 'report.docx'. Queue is now: deque(['report.docx'])
Added 'photo.png'. Queue is now: deque(['report.docx', 'photo.png'])
Added 'presentation.pptx'. Queue is now: deque(['report.docx', 'photo.png', 'presentation.pptx'])

--- Starting to process print jobs ---
Printing: report.docx
    Remaining jobs in queue: deque(['photo.png', 'presentation.pptx'])
Printing: photo.png
    Remaining jobs in queue: deque(['presentation.pptx'])
Printing: presentation.pptx
    Remaining jobs in queue: deque([])

All print jobs are complete.
```


</details>
</div>



## Key takeaways 
So far, our exploration has introduced four essential data structures, each governed by a distinct principle for organizing data. 
- **Dictionary**: manages labelled data through key-value pairs. 
- **Set**: ensures a collection of unique, unordered items, optimized for membership testing. 
- **Stack**: Adheres to a "Last-In, First-Out" (LIFO) protocol.
- **Queue**:  Follows a First-In, First-Out (FIFO) protocol.

I don't want you to stop here. Instead go more deeper and seek for more use cases of each data structure. Shift you thinking from "Can this be solved with a list?" to "What is the best tool for this job?". 

