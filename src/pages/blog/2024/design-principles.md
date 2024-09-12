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

Keep different concerns separate.

For e.g. presentational logic should not be mixed with the business logic otherwise the app will become unmaintainable in no time.

```ts
class TodoModel {
  constructor(public name: string, public isCompleted: boolean) {}

  // ... this class should only have code related to data manipulation

  save() {
    // ... code to save the todo
  }
}

class TodoLogger {
  // ... this class should only have code related to logging

  trackTodoStatus(todo: TodoModel) {
    // ... code to track the status of the todo

    this.logTodoStatus(todo);
  }

  logTodoStatus(todo: TodoModel) {
    // ... code to log the status of the todo
    console.log(`Todo name: ${todo.name} | isCompleted: ${todo.isCompleted}`);
  }
}

class TodoController {
  // ... this class should only have business logic
  addTodo(name: string, isCompleted: boolean) {
    const todo = new TodoModel(name, isCompleted);
    todo.save();
    todoLogger(todo);
  }
}

class TodoView {
  // ... this class should only have presentational logic
  todos: TodoModel[] = [];

  renderTodos() {
    // ... code to render todos
  }
}
```

- ## Modularity

An improvement to the above pattern is to use modules. In this case, we can separate concerns using modules.

For e.g. `TodoModel` and `TodoLogger` should be in separate modules. Each module should be responsible for a specific task. We can create a library for a particular task and can be maintained by the team.

If you have a very small team, maintainability of separate modules would be very difficult. Separating concerns in modules is quite challenging and requires a lot of time.

- ## Encapsulation

You need to hide the implementation details of a class. To do this, you can use encapsulation.

```ts
class TodoLogger {
  private logTodoStatus(todo: TodoModel) {
    // ... code to log the status of the todo
    console.log(`Todo name: ${todo.name} | isCompleted: ${todo.isCompleted}`);
  }

  trackTodoStatus(todo: TodoModel) {
    // ... code to track the status of the todo
    this.logTodoStatus(todo);
  }
}

class TodoController {
  constructor(private todoLogger: TodoLogger) {}

  addTodo(name: string, isCompleted: boolean) {
    const todo = new TodoModel(name, isCompleted);
    todo.save();
    todoLogger.trackTodoStatus(todo);
  }
}
```

The user of the class should not be able to access the implementation details of the class. The user should have no concern if it logs to the console or some other external storage.

Here, `TodoController` does not care about the implementation details of `TodoLogger`. It only cares about the `trackTodoStatus` method.

- ## Compositon Over Inheritance

There are a lot of disadvantages of using inheritance. One of them is that the child class is tightly coupled to the parent class. This means that the child class is not reusable. Also, the child class has to implement all the methods of the parent class. If the parent class is very complex, then the child class will become very complex as well.

In this case, we can use composition. Composition is a technique that allows us to create a class that is a composition of other classes.

For e.g. `TodoService` should be a composition of `TodoRepository` and `TodoLogger` using dependency injection.

```ts
interface TodoRepository {
  save(todo: Todo): void;

  // ... other methods
}

interface TodoLogger {
  trackTodoStatus(todo: Todo): void;

  // ... other methods
}

class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private todoLogger: TodoLogger
  ) {}

  addTodo(name: string, isCompleted: boolean) {
    const todo = new Todo(name, isCompleted);
    this.todoRepository.save(todo);
    this.todoLogger.trackTodoStatus(todo);
  }
}
```

- ## Cohension and Coupling

Cohension refers to how closely related two classes are. Coupling refers to how tightly related two classes are.

For e.g. `Todo` and `PriorityTodo` are tightly related. `PriorityTodo` is tightly coupled to `Todo` class. Whereas `TodoController` is loosely coupled to `TodoLogger`.

```ts
class Todo {
  constructor(
    public id: number,
    public name: string,
    public isCompleted: boolean
  ) {}
}

class PriorityTodo extends Todo {
  constructor(
    public id: number,
    public name: string,
    public isCompleted: boolean,
    public priority: string
  ) {}

  // ... other methods
}

class TodoLogger {
  trackTodoStatus(todo: Todo) {
    // ... code to track the status of the todo
  }
}

class TodoController {
  constructor(private todoLogger: TodoLogger) {}

  addTodo(name: string, isCompleted: boolean, priority: string) {
    const todo = new PriorityTodo(1, name, isCompleted, priority);
    this.todoLogger.trackTodoStatus(todo);
  }
}
```

- ## Inversion of Control (IoC)

IoC means that high level modules should not depend on low level modules. Both should depend on abstractions. It is similar to Dependency Inversion Principle that we discussed in the Solid principles.

- ## Fail-Fast

This means all the checks should be handled at the beginning of the code.

For e.g. `addTodo` function should only be called if the `todo` is valid.

```ts
function addTodo(name: string, isCompleted: boolean) {
  // validate the todo

  const isValid = isTodoValid(name, isCompleted);

  if (!isValid) {
    throw new Error("Invalid todo");
  }
  // ... code to add todo
}
```

- ## Principle of Least Astonishment

The code should be as simple as possible. User should not be surprised by `addTodo` function. The `addTodo` function should only add the todo if it is valid and should not toggle the status of the todo.

> A bad example

```ts
function addTodo(name: string, isCompleted: boolean) {
  // ... code to add todo

  const isValid = isTodoValid(name, isCompleted);

  if (!isValid) {
    throw new Error("Invalid todo");
  }

  // ... code to toggle the status of the todo
  toggleTodoStatus(todo);
}
```

> A good example

```ts
function addTodo(name: string, isCompleted: boolean) {
  // ... code to add todo

  const isValid = isTodoValid(name, isCompleted);

  if (!isValid) {
    throw new Error("Invalid todo");
  }

  // code to add the todo and there should not be any code to toggle the status of the todo or any other surprises.
}
```

- ## Convention Over Configuration

In order to keep our code simple and maintainable, we can use convention over configuration.

For e.g. we can provide default values to our properties if they are not provided by the user.

```ts
function addTodo(name: string, isCompleted = false) {
  // ... code to add todo
}
```

Instead of making isCompleted required, we can provide a default value as false as whenever a todo is created it is not completed. If we want to opt to configuration for such cases, it would become more complex.

- ## Idempotency

Idempotency refers to a property that is always the same. This is very useful when we want to add a todo and toggle the status of the todo.

For e.g. `addTodo` function should always add the same todo no matters how many times it is called. `toggleTodoStatus` function should always toggle the status of the todo no matter how many times it is called.

```ts
function addTodo(name: string, isCompleted: boolean) {
  todo = new Todo(name, isCompleted);
  new TodoRepository().save(todo);
}

function toggleTodoStatus(todo: {
  id: number;
  name: string;
  isCompleted: boolean;
}) {
  todo.isCompleted = !todo.isCompleted;
}
```

- ## Orthogonality

Orthogonality refers to the fact whenever a part of the code is changed, it should not affect other parts of the code. It is similar to the `Separation of Concerns` principle or the `Single Responsibility Principle`.

- ## Avoid Premature Optimization

You should write a code that works as fast as possible. You can always optimize it later. However, if the code that you are writing needs to be fast, then it is better to write optimize it first.

For e.g. if you have to get all todos to show on a table which has pagination, then it is better to write it first and then optimize it later. But if you want to generate a report for all todos it is better to write it in a optimized way in the beginning itself.

- ## Code for the Maintainer

**You should have empathy towards the maintainer when you are writing a code. You should keep yourself in the shoes of the maintainer. You should write good documentations and update the documentation as and when needed.**

- ## Testability

You should write code that is easy to test. A code that does not follow any pattern or rule should not be written. You can follow the principles/patterns that we discussed earlier to write a testable code.

- ## Use Meaningful Names

A code is maintainable if it has meaningful names. A meaningful name is a name that describes the purpose of the code. For e.g. `addTodo` function should be called `addTodo` and `toggleTodoStatus` function should be called `toggleTodoStatus`.

If you call `addTodo` as `add` and `toggle` then it is not maintainable. The name is vague and it takes a lot of thinking to understand the purpose of the code.

There are few rules to follow when naming a code.

- It is better understood when a function is named with a verb. For e.g. `addTodo` function should start with `add` and `toggleTodoStatus` function should be called `toggle`.

- It is better understood when a variable is named with a noun. For e.g. `todo` variable should be called `todo` instead of `t` or `t1`.

- It is better understood when singular and plural form of a noun is used for single and multiple objects. For e.g. `todos` should be called `todos` and `todo` should be called `todo`.

- Similary for a boolean value. For e.g. in order to track the completion status of a todo we can name the variable as `isCompleted` instead of `completed`.

- ## Use Patterns, but Don't Overuse Them

The patterns that we discussed are very useful in writing maintaiable and easily understandable code. But we should be pragmatic about how much and what principles we need depending on the project and the team we are working with.
