# HashMap & HashSet Implementation (JavaScript)

## Overview

This project implements two fundamental **hash-based data structures** from scratch in JavaScript:

* **HashMap**
* **HashSet**

Both structures are implemented without using JavaScript’s built-in `Map` or `Set` objects. The goal is to understand how **hash tables** work internally, including hashing, collision handling, and dynamic resizing.

This implementation follows the assignment from **The Odin Project JavaScript curriculum** and demonstrates the internal mechanics used by many real-world systems such as language runtimes, caches, and database indexes.

---

## Data Structures Implemented

### 1. HashMap

A **HashMap** stores data as **key–value pairs**.

Example:

```
"apple" → 10
"banana" → 20
"cat" → 30
```

The key is converted into an **array index** using a **hash function**, allowing average constant-time operations.

#### Supported Operations

| Method            | Description                              |
| ----------------- | ---------------------------------------- |
| `set(key, value)` | Inserts or updates a key-value pair      |
| `get(key)`        | Returns the value associated with a key  |
| `has(key)`        | Checks if a key exists                   |
| `remove(key)`     | Removes a key-value pair                 |
| `length()`        | Returns number of stored elements        |
| `clear()`         | Removes all elements                     |
| `keys()`          | Returns an array of all keys             |
| `values()`        | Returns an array of all values           |
| `entries()`       | Returns an array of `[key, value]` pairs |

---

### 2. HashSet

A **HashSet** stores **unique keys only**.

Example:

```
["apple", "banana", "cat"]
```

Internally, a HashSet can be implemented using the same hashing mechanism as a HashMap but without storing values.

#### Supported Operations

| Method        | Description                |
| ------------- | -------------------------- |
| `set(key)`    | Inserts a key              |
| `has(key)`    | Checks if a key exists     |
| `remove(key)` | Removes a key              |
| `length()`    | Returns number of elements |
| `clear()`     | Removes all elements       |
| `keys()`      | Returns all stored keys    |

---

## Core Concepts Used

### 1. Hash Function

Keys are transformed into array indices using a **deterministic hash function**.

```
hash = (31 * hash + charCode) % capacity
```

The prime multiplier `31` helps distribute keys uniformly across buckets.

---

### 2. Buckets

The hashmap uses an **array of buckets**:

```
buckets = [ [], [], [], ... ]
```

Each bucket stores key-value pairs that hash to the same index.

Example:

```
bucket[5] → [ ["cat", 30], ["dog", 40] ]
```

---

### 3. Collision Handling

Two different keys may produce the same index.

Example:

```
hash("cat") = 6
hash("dog") = 6
```

Both are stored in the same bucket using **separate chaining**.

```
bucket[6] → [ ["cat",30], ["dog",40] ]
```

---

### 4. Load Factor

The **load factor** determines when the hash table should resize.

```
loadFactor = number_of_entries / capacity
```

In this project:

```
loadFactor threshold = 0.75
```

When exceeded, the hashmap **doubles its capacity**.

---

### 5. Rehashing (Dynamic Resizing)

When the load factor threshold is exceeded:

1. Capacity doubles.
2. A new bucket array is created.
3. All existing entries are rehashed into the new structure.

This reduces collisions and keeps operations efficient.

---

## Time Complexity

Average performance assumes good hashing and balanced bucket distribution.

| Operation | Average Time | Worst Case |
| --------- | ------------ | ---------- |
| Insert    | O(1)         | O(n)       |
| Lookup    | O(1)         | O(n)       |
| Remove    | O(1)         | O(n)       |
| Resize    | O(n)         | O(n)       |

Worst-case behavior occurs when many keys collide into the same bucket.

---

## Example Usage

### HashMap Example

```javascript
const map = new HashMap();

map.set("apple", 10);
map.set("banana", 20);
map.set("cat", 30);

console.log(map.get("apple"));
console.log(map.has("banana"));
console.log(map.keys());
console.log(map.entries());
```

Output:

```
10
true
["apple", "banana", "cat"]
[
  ["apple", 10],
  ["banana", 20],
  ["cat", 30]
]
```

---

### HashSet Example

```javascript
const set = new HashSet();

set.set("apple");
set.set("banana");
set.set("apple");

console.log(set.keys());
console.log(set.has("banana"));
```

Output:

```
["apple", "banana"]
true
```

---

## Project Structure

```
project-root
│
├── hashmap.js
├── hashset.js
└── README.md
```

---

## Educational Purpose

This project was created to understand:

* How hash tables work internally
* Collision resolution techniques
* Dynamic resizing and rehashing
* Performance characteristics of hash-based data structures

These concepts are widely used in:

* Programming language runtimes
* Database indexing
* Caching systems
* Distributed systems

---

## Future Improvements

Possible extensions to this implementation:

* Linked-list based bucket structure
* Robin Hood hashing
* Open addressing strategies
* Iterators and generators
* Performance benchmarking
* Type-safe implementation using TypeScript

---

## References

* The Odin Project – JavaScript Curriculum
* CLRS: *Introduction to Algorithms*
* Java HashMap implementation
* Python dictionary design

---

## License

This project is intended for educational purposes.

