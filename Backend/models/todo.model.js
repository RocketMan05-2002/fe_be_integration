// model stores all database work
const fs = require("fs");

const getTodoData = () => {
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;

    return {data,todos};
}

const addOrUpdateData = (data) => {
    fs.writeFileSync("./db.json",JSON.stringify(data));
}

module.exports = {  getTodoData, addOrUpdateData };