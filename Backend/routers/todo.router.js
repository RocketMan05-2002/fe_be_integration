const express = require("express");
const { getAllTodos, addTodo, deleteTodo, updateTodo, getTodoById, getTodobyQuery } = require("../controllers/todo.controller");
const todoRouter = express.Router();

//1. get todos
todoRouter.get("/get-todos", getAllTodos)

//2. add a todo
todoRouter.post("/add-todo", addTodo )

//3. delete a todo
todoRouter.delete("/delete-todo/:id", deleteTodo)

//4. update a todo
todoRouter.put("/update-todo/:id", updateTodo)

//5. gte todo by id
todoRouter.get("/todo-id/:id", getTodoById)

//6. get todo by query
todoRouter.get("/todo-query", getTodobyQuery)

module.exports = todoRouter;