---
layout: "../../../layouts/BlogPost.astro"
title: "Design Principles Every Software Developer Should Know"
description: "This post explains few design patterns that every software developer should know."
pubDate: "Sept 09 2024"
heroImage: "/code.jpg"
isPublished: true
---

Design paterns keep our code bases maintainable and understandable. This post explains few design patterns that every software developer should know.

- ## Dry (Don't Repeat Yourself)

Avoid code duplication using this pattern.

> A bad example

```ts
function addTodo(name: string, isCompleted: boolean) {
  // code to add todo
  console.log(`Adding todo - name: ${name} | isCompleted: ${isCompleted}`);
}

function deleteTodo(id: number) {
  // code to delete todo
  console.log(`Deleting todo - id: ${id}`);
}
```

In this example, we are logging the actions in the console which is duplicated. If we decide to use other library for logging, then we have to change a lot of code which is not a good practice.

We will use an example of a Todo application to explain these patterns.

> A good example

```ts
function todoLogger(action: string) {
  console.log(`Action: ${action}`);
}

function addTodo(name: string, isCompleted: boolean) {
  // code to add todo
  todoLogger(`Adding todo - name: ${name} | isCompleted: ${isCompleted}`);
}

function deleteTodo(id: number) {
  // code to delete todo
  todoLogger(`Deleting todo - id: ${id}`);
}
```

Here we are using the `todoLogger` function to log the actions. If we decide to use other library for logging, then we have to only change the `todoLogger` function.

- ## KISS (Keep It Simple, Stupid)

This principle is used to keep our code simple and easily understandable.

> A bad example

```ts
function toggleTodoStatus(todo: {
  id: number;
  name: string;
  isCompleted: boolean;
}) {
  if (todo.isCompleted) {
    todo.isCompleted = false;
  } else {
    todo.isCompleted = true;
  }
}
```

Here, we are toggling the status of the todo using if-else. There are two branches in the if-else which becomes very lengthy.

> A good example

```ts
function toggleTodoStatus(todo: {
  id: number;
  name: string;
  isCompleted: boolean;
}) {
  todo.isCompleted = !todo.isCompleted;
}
```

Here, we are toggling the status of the todo using ternary operator which is more readable.

- ## YAGNI (You Ain't Gonna Need It)

This principle is used to avoid unnecessary code. You should not add codes that you think you might need in the future because in most of the cases you don't need it.

For e.g. you might think you need feature to track the status of the todo. But in most of the cases you don't need it. When you need it, you can always write it at that moment.

> A bad example

```ts
// not required at this moment
function trackTodoStatus(todo: {
  id: number;
  name: string;
  isCompleted: boolean;
}) {
  // code to track the status of the todo
}

function toggleTodoStatus(todo: {
  id: number;
  name: string;
  isCompleted: boolean;
}) {
  // code to toggle the status of the todo

  trackTodoStatus(todo);
}
```

> A good example

```ts
function toggleTodoStatus(todo: {
  id: number;
  name: string;
  isCompleted: boolean;
}) {
  // code to toggle the status of the todo
  // have removed the tracking code
}
```

- ## Solid Principles

These principles are mostly used in Object Oriented Programming.

1. **Single Responsibility Principle**

In this principle, a class should have only one reason to change.

> A bad example

```ts
type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

class TodoService {
  todos: Todo[] = [];

  addTodo(name: string, isCompleted: boolean) {
    // code to add todo
  }

  deleteTodo(id: number) {
    // code to delete todo
  }

  renderTodos() {
    // code to render todos
  }

  // ... other methods
}
```

Here `TodoService` class has two reasons to change - one when we need to add methods related to data persistence and other when need to change the rendering logic.

> A good example

```ts
type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

class TodoService {
  todos: Todo[] = [];

  addTodo(name: string, isCompleted: boolean) {
    // code to add todo
  }

  deleteTodo(id: number) {
    // code to delete todo
  }

  // ... other methods
}

class TodoRenderer {
  todos: Todo[] = [];

  renderTodos() {
    // code to render todos
  }

  // ... other methods
}
```

2. **Open/Closed Principle**

In this principle, a class should be open for extension but closed for modifications.

For e.g. if we have new requirement to add a priority status to our todos, we can do as below.

> A bad example

```ts
class Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  priority: string;

  constructor(id: number, name: string, isCompleted: boolean) {
    this.id = id;
    this.name = name;
    this.isCompleted = isCompleted;
  }

  // have added new feature directly in the `Todo` class
  setPriority(priority: string) {
    this.priority = priority;
  }
}
```

What we have done is we added a priority field in our existing `Todo` class. This violates the Open/Closed Principle.

> A good example

```ts
class TodoBase {
  constructor(
    public id: number,
    public name: string,
    public isCompleted: boolean
  ) {}

  // ... other methods
}

class PriorityTodo extends TodoBase {
  constructor(
    public id: number,
    public name: string,
    public isCompleted: boolean,
    public priority: string
  ) {
    super(id, name, isCompleted);
  }
}
```

Here, we have created a new class `PriorityTodo` which extends the `TodoBase` class. This is a good example of the Open/Closed Principle.

3. **Liskov Substitution Principle**

We should be able to substitute a base class with its subclass.

For e.g. in open/closed principle, we can replace the `Todo` class with `PriorityTodo` class without breaking our application.

```ts
// ... codes from open/closed principle

const todos: TodoBase[] = [
  new Todo(1, "Todo 1", false),
  new PriorityTodo(2, "Todo 2", false, "High"),
];
```

4. **Interface Segregation Principle**

A class should not depend on interfaces that it does not use.

> A bad example

```ts
interface TodoManager {
  addTodo: (name: string, isCompleted: boolean) => void;
  deleteTodo: (id: number) => void;
  renderTodos: () => void;
}

class TodoService implements TodoManager {
  addTodo(name: string, isCompleted: boolean) {
    // code to add todo
  }

  deleteTodo(id: number) {
    // code to delete todo
  }

  renderTodos() {
    // code to render todos
  }
}
```

Here, we have created a class `TodoService` which implements `TodoManager` interface. The interface `TodoManager` contains two types of methods - one related to persistence and other related to rendering. This violates the Interface Segregation Principle.

> A good example

```ts
interface TodoManager {
  addTodo: (name: string, isCompleted: boolean) => void;
  deleteTodo: (id: number) => void;
}

interface TodoRenderer {
  renderTodos: () => void;
}

class TodoService implements TodoManager, TodoRenderer {
  addTodo(name: string, isCompleted: boolean) {
    // code to add todo
  }

  deleteTodo(id: number) {
    // code to delete todo
  }

  renderTodos() {
    // code to render todos
  }
}
```

Here, we have created a class `TodoService` which implements `TodoManager` and `TodoRenderer` interface. Now, the `TodoService` class only depends on `TodoManager` and `TodoRenderer` interface. If we don't want the rendering methods in the `TodoService` class, we can remove `TodoRenderer` interface from `TodoService` class.

5. **Dependency Inversion Principle**

A high level module should not depend on low level modules. Both should depend on abstractions.

For e.g. `TodoService` class should depend on the low level data persistence class `TodoRepository` using an abstraction (Dependency Injection).

```ts
interface TodoRepository {
  save(todo: Todo): void;
}

class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  addTodo(name: string, isCompleted: boolean) {
    this.todoRepository.save(new Todo(name, isCompleted));
  }
  // ... other methods
}
```

- ## Separation of Concerns

- ## Modularity

- ## Encapsulation

- ## Compositon Over Inheritance

- ## Principle of Least Knowledge

- ## Cohension and Coupling

- ## Inversion of Control (IoC)

- ## Fail-Fast

- ## Principle of Least Astonishment

- ## Convention Over Configuration

- ## Idempotency

- ## Orthogonality

- ## Avoid Premature Optimization

- ## Code for the Maintainer

- ## Testability

- ## Use Meaningful Names

- ## Loose Coupling and High Cohension

- ## Use Patterns, but Don't Overuse Them

- ## Don't Make Me Think
