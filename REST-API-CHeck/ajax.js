const todoElement = document.getElementById("todo-container");

const formElement = document.querySelector("form");

const fetchAllTodos = async () => {
  const response = await fetch("http://localhost:3000/list");
  const responseData = await response.json();

  for (const todo of responseData.todos) {
    const li = document.createElement("li");
    li.textContent = todo.item;
    todoElement.firstElementChild.append(li);
  }
};

const addTodosData = async (event) => {
  event.preventDefault();
  const input = formElement.querySelector("input").value;

  if (input.trim() === "") {
    return;
  }

  const response = await fetch("http://localhost:3000/list", {
    method: "POST",
    body: JSON.stringify({
      item: input,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  formElement.querySelector("input").value = "";

  await response.json();
};

fetchAllTodos();

formElement.addEventListener("submit", addTodosData);
