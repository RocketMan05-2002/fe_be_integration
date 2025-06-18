const express= require("express");
const blogRouter = express.Router();
const getAllBlogs = require("../controllers/blog.controller");


//7. get all blogs
blogRouter.get("/get-blogs", getAllBlogs);

module.exports = blogRouter;