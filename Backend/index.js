const express = require("express");
const app = express();
const fs = require("fs");
const todoRouter = require("./routers/todo.router");
const blogRouter = require("./routers/blog.router");
const loggerMiddleware = require("./middlewares/logger");
var cors = require("cors");
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());

//0. test request
app.get("/test",(req,res)=>{
    res.send("working");
})

//1. todo requests
app.use("/todos", todoRouter);

//2. blog requests
app.use("/blogs", blogRouter);

app.listen(8000,()=>{
    console.log("server started via port 8000");
});