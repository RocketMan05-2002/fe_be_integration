const { getTodoData, addOrUpdateData } = require("../models/todo.model");

const getAllTodos = (req, res) => {
  let todos = getTodoData().todos;
  res.send({ msg: "list of todos", todos });
};

const addTodo = (req, res) => {
  let newTodo = req.body;
  let data = getTodoData().data;
  let todos = data.todos;
  todos.push(newTodo);
  addOrUpdateData(data);
  res.send("todo was added");
};

const deleteTodo = (req, res) => {
  let id = req.params.id;
  let data = getTodoData().data;
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send("todo wasnt found");
  } else {
    let filteredTodos = todos.filter((el) => el.id != id);
    data.todos = filteredTodos;
    addOrUpdateData(data);
    res.send("todo was deleted");
  }
};

const updateTodo = (req, res) => {
  let id = req.params.id;
  let data = getTodoData().data;
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send("todo wasnt found");
  } else {
    let updatedTodos = todos.map((el) => {
      if (el.id == id) {
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });
    data.todos = updatedTodos;
    addOrUpdateData(data);
    res.send("todo was updated");
  }
};

const getTodoById = (req, res) => {
  let id = req.params.id;
  let todos = getTodoData().todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send("todo wasnt found");
  } else {
    todos.forEach((el) => {
      if (el.id == id) {
        res.send({ todos: el });
      }
    });
  }
};

const getTodobyQuery = (req, res) => {
  const { name } = req.query;
  let todos = getTodoData().todos;

  if (name) {
    let filteredTodos = todos.filter((el) => {
      if (el.name.includes(name)) {
        return el;
      }
    });
    if (filteredTodos.length == 0) {
      res.send("todo wasnt found");
    } else {
      res.send({ todos: filteredTodos });
    }
  } else {
    res.send("todo wasnt found");
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodoById,
  getTodobyQuery,
};
