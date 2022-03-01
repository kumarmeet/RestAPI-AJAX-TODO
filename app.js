const path = require("path");
const express = require("express");
const cors = require("cors");

const todoDb = require("./database/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.get("/list", async (req, res) => {
  const todos = await todoDb.todo.find({});
  return res.json({ todos: todos });
});

app.post("/list", async (req, res, next) => {
  const todos = new todoDb.todo({
    item: req.body.item,
  });
    
  await todos.save();

  return res.json({
    message: "Added Successfully",
  });
});

app.patch("/list/:id", async (req, res, next) => {
  const findTodoById = await todoDb.todo.findById(req.params.id);

  console.log(findTodoById);

  findTodoById.item = req.body.item;

  await findTodoById.save();

  return res.json({
    message: "Updated Successfully",
  });
});

app.delete("/list/:id", async (req, res, next) => {
  await todoDb.todo.findOneAndDelete(req.body.id);

  return res.json({
    message: "Deleted Successfully",
  });
});

todoDb
  .connect()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Databse not connected");
  });
