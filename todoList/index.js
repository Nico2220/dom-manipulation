const inputBox = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const lists = document.getElementById("todo-list");

inputBox.addEventListener("input", (e) => handleChange(e));
addButton.addEventListener("click", addTodo);

function handleChange(e) {
  const value = e.target.value;
  addButton.disabled = inputBox.value.length === 0;
}

function addTodo() {
  const li = document.createElement("li");

  const h2 = document.createElement("h2");
  h2.textContent = inputBox.value;

  const button = document.createElement("button");
  button.textContent = "X";
  button.classList.add("delete-button");

  li.append(h2, button);

  lists.appendChild(li);

  inputBox.value = "";
  addButton.disabled = true;

  button.addEventListener("click", () => li.remove());
}
