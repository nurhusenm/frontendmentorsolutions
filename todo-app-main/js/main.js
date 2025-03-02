const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoCheck = document.querySelectorAll(".todo-checkbox");
const crossBtn = document.querySelector(".cross-btn");
const clearBtn = document.querySelector(".clear");
const textTodos = document.querySelector(".todo-count");

function countTodos() {
  const allTodos = document.querySelectorAll(".todo-item");
  console.log(allTodos);

  const count = allTodos.length;
  textTodos.textContent = `${count} item left`;
  return count;
}
countTodos();

todoForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const inputValue = todoInput.value.trim(); // Trim whitespace
    if (inputValue) {
      // console.log(`u entered ${inputValue}`);

      // Create a new list item
      const newTodoItem = document.createElement("li");

      newTodoItem.classList.add("todo-item");

      const todoInfo = document.createElement("div");
      todoInfo.classList.add("todo-info");
      const img = document.createElement("img");
      img.src = "./images/icon-cross.svg";
      img.classList.add("cross-btn"); // Correctly add class

      // Create a checkbox
      const button = document.createElement("button");
      // checkbox.type = "checkbox";
      button.classList.add("todo-checkbox"); // Correctly add class
      const icon = document.createElement("img");
      icon.src = "./images/icon-check.svg";
      // img.classList.add("cross-btn");

      // Create a label
      const label = document.createElement("label");
      label.textContent = inputValue; // Set the label text to the input value

      // Append the checkbox and label to the new list item
      button.appendChild(icon);
      todoInfo.appendChild(button);
      todoInfo.appendChild(label);
      newTodoItem.appendChild(todoInfo);
      newTodoItem.appendChild(img);

      // Append the new list item to the todo list
      todoList.appendChild(newTodoItem);

      // Clear the input field
      todoInput.value = "";
      countTodos();
    }
  }
});

document.addEventListener("click", (e) => {
  // console.log("clicked");

  const todoCheckbox = e.target.closest(".todo-checkbox");
  // console.log(todoCheckbox);

  if (e.target.closest(".cross-btn")) {
    const todoItem = e.target.closest(".todo-item");
    if (todoItem) {
      todoItem.remove();
    }

    countTodos();
  }

  // const todosItem = todoCheckbox.closest(".todo-item");
  // const checkedIcon = todosItem.querySelector("img");

  if (e.target.closest(".clear")) {
    console.log("clear clicked");

    // Get all todo items
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
      const checkedIcon = item.querySelector("img"); // Assuming this is the check icon

      // Check if the icon is visible (indicating the item is completed)
      if (checkedIcon && checkedIcon.style.display === "block") {
        item.style.display = "none"; // Hide the completed item
        console.log("Hiding completed item");
      }
    });
  }

  if (todoCheckbox) {
    e.preventDefault();

    const label = todoCheckbox.closest(".todo-info").querySelector("label");
    // console.log(todosItem);
    // console.log(checkedIcon);
    const img = todoCheckbox.querySelector("img");

    // if (label) {
    //   console.log("Closest label element:", label);
    // } else {
    //   console.log("No label found");
    // }

    if (img) {
      // Toggle the display of the image
      if (img.style.display === "none" || img.style.display === "") {
        img.style.display = "block"; // Show the image
        todoCheckbox.classList.add("active"); // Add active class to change background
        label.style.color = "hsl(235, 19%, 35%)";
        label.style.textDecoration = "line-through";
      } else {
        img.style.display = "none";
        todoCheckbox.classList.remove("active"); // Add active class to change background
        label.style.color = "";
        label.style.textDecoration = "none";
      }
    }
  }
});
