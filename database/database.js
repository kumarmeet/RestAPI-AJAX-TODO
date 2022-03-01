const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
}

const todoSchema = new mongoose.Schema({
  item: String,
});

const todo = mongoose.model("todo", todoSchema);

module.exports = {
  connect: connect,
  todo: todo,
};
