const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoCheck = document.querySelectorAll(".todo-checkbox");

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
    }
  }
});

document.addEventListener("click", (e) => {
  console.log("clicked");

  const todoCheckbox = e.target.closest(".todo-checkbox");

  if (todoCheckbox) {
    e.preventDefault();

    const label = todoCheckbox.closest(".todo-info").querySelector("label");
    const img = todoCheckbox.querySelector("img");

    if (label) {
      console.log("Closest label element:", label);
    } else {
      console.log("No label found");
    }

    if (img) {
      // Toggle the display of the image
      if (img.style.display === "none" || img.style.display === "") {
        img.style.display = "block"; // Show the image
        todoCheckbox.classList.add("active"); // Add active class to change background
      } else {
        img.style.display = "none";
      }
    }
  }
});
