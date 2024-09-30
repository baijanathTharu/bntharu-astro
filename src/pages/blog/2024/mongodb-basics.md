---
layout: "../../../layouts/BlogPost.astro"
title: "A Beginner's Guide to MongoDB: Moving from SQL to NoSQL"
description: "The blog will help you to learn mongodb as a beginner."
pubDate: "Sept 05 2024"
heroImage: "/code.jpg"
isPublished: true
---

If you're coming from a background in relational databases like MySQL or PostgreSQL, the shift to NoSQL databases like MongoDB can seem a bit overwhelming. But don't worry—this guide is designed to help you make the transition smoothly. We'll walk through the key concepts of MongoDB and how it compares to SQL databases, along with practical examples.

## What is MongoDB?

MongoDB is a NoSQL database designed to store data in a flexible, JSON-like format called BSON (Binary JSON). Unlike SQL databases, where you define tables, columns, and data types upfront, MongoDB allows you to store data in documents, which can have varying structures. This flexibility makes it ideal for handling unstructured or semi-structured data.

## Key Differences Between SQL and MongoDB

### SQL (Relational DB)

- **Data Structure:** SQL databases use tables composed of rows and columns to store data. Each row represents a record, and each column corresponds to a specific attribute of the data.

- **Schema:** SQL databases have a fixed schema, meaning you must define the structure (columns and data types) of your tables before inserting data.

- **Relationships:** SQL databases handle relationships between data through joins, which allow you to combine data from multiple tables based on a common key.

- **Query Language:** SQL databases use SQL (Structured Query Language) to interact with and query the data.

- **Transactions:** SQL databases follow the ACID (Atomicity, Consistency, Isolation, Durability) properties for transactions to ensure reliable and consistent data handling.

### MongoDB (NoSQL)

- **Data Structure:** MongoDB stores data in collections, where each collection consists of documents. A document is a BSON (Binary JSON) object, similar to a JSON structure, and it can contain nested and varying fields.

> ### BSON vs JSON (Brief Overview)

- **JSON (JavaScript Object Notation)**:

  - **Human-readable** text format used for data interchange.
  - Supports basic data types (string, number, boolean, array, object, null).
  - Commonly used in web APIs for transmitting data.
  - Lightweight and easy to work with.

- **BSON (Binary JSON)**:
  - **Binary format** used by MongoDB for efficient storage and processing.
  - Supports additional data types (Date, Binary, ObjectID, Decimal128).
  - Optimized for speed and traversal in databases.
  - Not human-readable, but faster for machines to encode/decode.

> In short, **JSON** is simpler and human-readable, while **BSON** is optimized for database performance with more data types and binary structure.

- **Schema:** MongoDB allows for flexible or dynamic schemas, meaning the structure of documents in a collection can vary, allowing for different fields across documents.

- **Relationships:** MongoDB can handle relationships by embedding related data within a document or by referencing other documents, which provides more flexibility compared to SQL joins.

- **Query Language:** MongoDB’s query language uses a format similar to JSON for querying, allowing you to filter, project, and manipulate data in a more intuitive manner.

- **Transactions:** Since MongoDB version 4.0, it supports ACID transactions, making it suitable for applications that require guaranteed consistency across multiple operations.

## Collections and Documents: MongoDB's Core

In SQL, data is stored in tables, which have rows and columns. In MongoDB, data is stored in collections, and the entries within collections are called documents.

- Collections in MongoDB are similar to tables in SQL, but unlike tables, collections don’t require a fixed schema. You can insert documents with different structures into the same collection.
- Documents in MongoDB are similar to rows in SQL, but they are stored as JSON-like objects (BSON format), which means they can have nested fields and varying structures.

> Example
> Here’s how data might look in SQL versus MongoDB:

SQL (Table-Based):
id name age email
1 John 25 john@gmail.com
2 Alice 30 alice@gmail.com
MongoDB (Document-Based):

```json
{
  "_id": 1,
  "name": "John",
  "age": 25,
  "email": "john@gmail.com"
}
{
  "_id": 2,
  "name": "Alice",
  "age": 30,
  "email": "alice@gmail.com"
}
```

As you can see, each document in MongoDB contains key-value pairs, similar to JSON objects.

## Setting Up MongoDB

Before diving into MongoDB commands, let’s make sure you have MongoDB installed and set up.

1. Download MongoDB from the official [MongoDB website](https://www.mongodb.com/try/download/community).

1. Install MongoDB on your machine and run the MongoDB service. You can use the following command to start MongoDB:

```bash
mongod
```

3. MongoDB Shell: Open the MongoDB shell using the following command:

```bash
mongo
```

The shell allows you to interact with your MongoDB database directly.

## Basic CRUD Operations in MongoDB

Once you have MongoDB up and running, you’ll want to start working with your data. Let’s explore basic CRUD (Create, Read, Update, Delete) operations, similar to what you do in SQL.

### Inserting Data (Create)

In SQL, you would use an INSERT statement to add rows to a table. In MongoDB, you insert documents into collections using insertOne() or insertMany().

#### SQL Equivalent

```sql
INSERT INTO users (name, age) VALUES ('John', 25);
```

#### MongoDB Example

```javascript
db.users.insertOne({ name: "John", age: 25 });
```

- This creates a new document in the users collection.
- MongoDB automatically generates an \_id field for each document, which serves as the primary key.

### Querying Data (Read)

In SQL, you'd use SELECT to retrieve data. In MongoDB, you use `find()` to query documents.

#### SQL Equivalent

```sql
SELECT * FROM users WHERE age = 25;
```

#### MongoDB Example

```javascript
db.users.find({ age: 25 });
```

- The find() method retrieves all documents that match the query. In this case, it will return all users with the age of 25.

### Updating Data (Update)

To update data in SQL, you'd use the UPDATE statement. In MongoDB, you use `updateOne()` or `updateMany()`.

#### SQL Equivalent

```sql
UPDATE users SET age = 26 WHERE name = 'John';
```

#### MongoDB Example

```javascript
db.users.updateOne({ name: "John" }, { $set: { age: 26 } });
```

- The $set operator modifies the specified field (age) while leaving the other fields unchanged.

### Deleting Data (Delete)

In SQL, you'd use the DELETE statement to remove data. In MongoDB, you use `deleteOne()` or `deleteMany()`.

### SQL Equivalent

```sql
DELETE FROM users WHERE name = 'John';
```

### MongoDB Example

```javascript
db.users.deleteOne({ name: "John" });
```

- This removes the document where the name is "John."

### Data Modeling in MongoDB

In SQL, you define a schema (a fixed structure for your data) using CREATE TABLE statements. MongoDB is schema-less, meaning that you don’t need to define a structure upfront. However, you can still use data modeling techniques to organize your data effectively.

**Embedding vs. Referencing**
One of the biggest differences in MongoDB is how relationships between data are handled.

- Embedding: You can store related data within the same document (similar to nested structures in JSON).
- Referencing: Alternatively, you can store a reference (similar to a foreign key in SQL) to another document in a different collection.

#### Embedding Example

If you have users and their associated addresses, you can embed the address directly in the user document:

```json
{
  "_id": 1,
  "name": "John",
  "age": 25,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

#### Referencing Example

Alternatively, you could store the address in a separate collection and reference it in the user document:

```json
{
  "_id": 1,
  "name": "John",
  "age": 25,
  "addressId": 101
}
```

```json
{
  "_id": 101,
  "street": "123 Main St",
  "city": "New York",
  "zip": "10001"
}
```

In MongoDB, it’s generally recommended to embed documents when the related data is accessed together and to reference when it’s not.

### Using MongoDB in Node.js

To integrate MongoDB into a Node.js application, you can use the official MongoDB Node.js driver. Alternatively, many developers prefer to use Mongoose, an ODM (Object Data Modeling) library for MongoDB.

### Setting Up a MongoDB Connection in Node.js

1. Install the MongoDB driver:

```bash
npm install mongodb
```

2. Connect to MongoDB in your Node.js application:

```javascript
const { MongoClient } = require("mongodb");

async function run() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("myDatabase");
    const collection = db.collection("users");

    // Insert a document
    await collection.insertOne({ name: "John", age: 25 });

    // Query the document
    const user = await collection.findOne({ name: "John" });
    console.log("Found User:", user);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
```

This simple script connects to a MongoDB instance, inserts a user, and then queries that user. After the operations, the connection to the MongoDB server is closed.

### Using Mongoose with MongoDB

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schema-based modeling, making it easier to work with MongoDB in your Node.js applications. This article walks through setting up Mongoose, defining schemas, establishing relationships, and performing filtering, sorting, and pagination.

#### Setting Up Mongoose

First, install Mongoose using npm:

```bash
npm install mongoose
```

Then, connect to your MongoDB instance:

```js
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get a reference to the connection
const db = mongoose.connection;

// Log an error if the connection fails
db.on("error", (err) => {
  console.error("connection error:", err);
});

// Log success message once connected
db.once("open", function () {
  console.log("Connected to MongoDB!");
});
```

#### Defining Schemas with Mongoose

In Mongoose, schemas define the structure of the documents in your collections. We’ll define two schemas: User and Todo.

**User Schema**
The User schema will contain basic information such as name, email, and age.

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  email: { type: String, required: true, unique: true }, // Email must be unique
  age: Number, // Age is optional
});
```

**Todo Schema**
The Todo schema will have fields for the title, description, and status. We'll also establish a relationship with the User schema by referencing the User model.

```javascript
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title is required
  description: String, // Description is optional
  status: { type: String, enum: ["pending", "completed"], default: "pending" }, // Status is either pending or completed
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  createdAt: { type: Date, default: Date.now }, // Automatically set createdAt to the current date
});
```

#### Creating Models

After defining the schemas, you can create models based on them. Models are what allow you to interact with the actual MongoDB collections.

```javascript
const User = mongoose.model("User", userSchema); // User model
const Todo = mongoose.model("Todo", todoSchema); // Todo model
```

#### Creating Documents and Establishing Relationships

Let’s create a new User and a related Todo document.

```javascript
async function createUserAndTodo() {
  // Create a new user
  const user = new User({
    name: "John Doe",
    email: "john@example.com",
    age: 30,
  });
  await user.save(); // Save the user to the database

  // Create a new todo linked to the user
  const todo = new Todo({
    title: "Complete homework",
    description: "Finish the math homework",
    user: user._id, // Reference the user's ID
  });
  await todo.save(); // Save the todo to the database

  console.log("User and Todo created!");
}

createUserAndTodo();
```

#### Populating Related Data

When querying the Todo, we can use the .populate() method to fetch related User information.

```javascript
async function getTodoWithUser() {
  const todo = await Todo.findOne({ title: "Complete homework" }).populate(
    "user"
  ); // Populate the 'user' field with the associated User document
  console.log(todo); // Log the todo along with the associated user information
}

getTodoWithUser();
```

#### Filtering Data

To filter documents, you can use Mongoose’s find() method. Here’s an example of how to filter todos with a pending status:

```javascript
async function getPendingTodos() {
  const todos = await Todo.find({ status: "pending" }); // Find all todos with status 'pending'
  console.log(todos); // Log the result
}

getPendingTodos();
```

#### Sorting Data

To sort documents, use the sort() method. This example shows how to sort todos by the createdAt field in descending order:

```javascript
async function getTodosSortedByDate() {
  const todos = await Todo.find().sort({ createdAt: -1 }); // Sort by 'createdAt' in descending order
  console.log(todos); // Log the sorted result
}

getTodosSortedByDate();
```

#### Combining Filtering and Sorting

You can filter and sort results at the same time. For example, to find all completed todos and sort them by createdAt:

```javascript
async function getCompletedTodosSorted() {
  const todos = await Todo.find({ status: "completed" }) // Filter todos with status 'completed'
    .sort({ createdAt: -1 }); // Sort by 'createdAt' in descending order
  console.log(todos); // Log the result
}

getCompletedTodosSorted();
```

#### Pagination with limit() and skip()

When dealing with large datasets, you can paginate results using limit() and skip(). This allows you to fetch a limited number of documents per page.

```javascript
async function getTodosWithPagination(page = 1, limit = 10) {
  const todos = await Todo.find()
    .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
    .skip((page - 1) * limit) // Skip documents for the previous pages
    .limit(limit); // Limit the number of results per page
  console.log(todos); // Log the paginated results
}

getTodosWithPagination(1, 5); // Fetch the first 5 todos from page 1
```

## Final Thoughts

MongoDB offers a lot of flexibility, especially when dealing with unstructured or semi-structured data. It’s perfect for applications that need to scale horizontally or when the data structure is not rigid. Coming from an SQL background, it might take a little time to adjust to MongoDB’s dynamic nature, but once you do, you'll appreciate the freedom it offers.

By now, you should have a solid understanding of MongoDB basics and how it compares to SQL. You’ve learned about collections, documents, CRUD operations, data modeling, and even how to integrate MongoDB and mongoose with Node.js.

So, go ahead and explore further! Try building a small application
