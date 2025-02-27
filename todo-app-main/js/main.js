const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

todoForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const inputValue = todoInput.value.trim(); // Trim whitespace
    if (inputValue) {
      console.log(`u entered ${inputValue}`);

      // Create a new list item
      const newTodoItem = document.createElement("li");

      newTodoItem.classList.add("todo-item");

      const todoInfo = document.createElement("div");
      todoInfo.classList.add("todo-info");
      const img = document.createElement("img");
      img.src = "./images/icon-cross.svg";
      img.classList.add("cross-btn"); // Correctly add class

      // Create a checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("todo-checkbox"); // Correctly add class

      // Create a label
      const label = document.createElement("label");
      label.textContent = inputValue; // Set the label text to the input value

      // Append the checkbox and label to the new list item
      todoInfo.appendChild(checkbox);
      todoInfo.appendChild(label);
      newTodoItem.appendChild(todoInfo);
      newTodoItem.appendChild(img);

      // Append the new list item to the todo list
      todoList.appendChild(newTodoItem);

      // Clear the input field
      todoInput.value = "";
    }
  }
});
