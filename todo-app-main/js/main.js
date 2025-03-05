const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const textTodos = document.querySelector(".todo-count");
const toggleBtn = document.querySelector(".theme-toggle img");
const sunIcon = document.querySelector(".sunIcon");
const moonIcon = document.querySelector(".moonIcon");
const footerButtons = document.querySelectorAll(".footer-button");

function countTodos() {
  const allTodos = document.querySelectorAll(".todo-item");
  const activeCount = Array.from(allTodos).filter((item) => {
    const checkedIcon = item.querySelector("img");
    return checkedIcon.style.display === "none"; // Active todos have the check icon hidden
  }).length;

  textTodos.textContent = `${activeCount} item left`;
}

countTodos();

todoForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    if (inputValue) {
      const newTodoItem = document.createElement("li");
      newTodoItem.classList.add("todo-item");

      const todoInfo = document.createElement("div");
      todoInfo.classList.add("todo-info");

      const button = document.createElement("button");
      button.classList.add("todo-checkbox");
      const icon = document.createElement("img");
      icon.src = "./images/icon-check.svg";
      icon.style.display = "none"; // Initially hidden

      const label = document.createElement("label");
      label.textContent = inputValue;

      const img = document.createElement("img");
      img.src = "./images/icon-cross.svg";
      img.classList.add("cross-btn");

      button.appendChild(icon);
      todoInfo.appendChild(button);
      todoInfo.appendChild(label);
      newTodoItem.appendChild(todoInfo);
      newTodoItem.appendChild(img);
      todoList.appendChild(newTodoItem);

      todoInput.value = "";
      countTodos();
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".cross-btn")) {
    const todoItem = e.target.closest(".todo-item");
    if (todoItem) {
      todoItem.remove();
      countTodos();
    }
  }

  if (e.target.closest(".clear")) {
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item) => {
      const checkedIcon = item.querySelector("img");
      if (checkedIcon.style.display === "block") {
        item.remove();
      }
    });
    countTodos();
  }

  const todoCheckbox = e.target.closest(".todo-checkbox");
  if (todoCheckbox) {
    const label = todoCheckbox.closest(".todo-info").querySelector("label");
    const img = todoCheckbox.querySelector("img");

    if (img) {
      if (img.style.display === "none" || img.style.display === "") {
        img.style.display = "block"; // Show the check icon
        label.style.color = "hsl(235, 19%, 35%)";
        label.style.textDecoration = "line-through";
        todoCheckbox.classList.add("active");
      } else {
        todoCheckbox.classList.remove("active");
        img.style.display = "none"; // Hide the check icon
        label.style.color = "";
        label.style.textDecoration = "none";
      }
      countTodos(); // Update the count after toggling
    }
  }

  // Filter logic for footer buttons
  footerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const filter = e.target.textContent;
      footerButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      filterTodos(filter);
    });
  });
});

function filterTodos(filter) {
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    const checkedIcon = item.querySelector("img");
    const isCompleted = checkedIcon.style.display === "block";

    if (filter === "All") {
      item.style.display = "flex"; // Show all todos
    } else if (filter === "Active") {
      item.style.display = isCompleted ? "none" : "flex"; // Show only active todos
    } else if (filter === "Completed") {
      item.style.display = isCompleted ? "flex" : "none"; // Show only completed todos
    }
  });
}

// Theme toggle functionality
// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  sunIcon.classList.toggle("active");

  toggleBtn.addEventListener("click", function () {
    // Toggle the active class for sun and moon icons
    sunIcon.classList.toggle("active");
    moonIcon.classList.toggle("active");

    // Change the background color based on the active icon
    if (sunIcon.classList.contains("active")) {
      document.body.style.background = "hsl(0, 0%, 98%)"; // Light mode
    } else {
      document.body.style.background = "hsl(235, 21%, 11%)"; // Dark mode
    }
  });
});
