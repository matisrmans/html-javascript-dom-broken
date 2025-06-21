document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const STORAGE_KEY = "todoTasks";

  function saveTasks() {
    let tasks = [];
    const listItems = taskListContainer.querySelectorAll("li");

    listItems.forEach(function (item) {
      const taskText = item.querySelector("span").textContent;
      const isCompleted = item.classList.contains("completed");
      tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);

      tasks.forEach(function (task) {
        console.log(task);
      });
    }
  }

  function createTaskElement(taskText, isCompleted) {
    const listItem = document.createElement("li");

    if (isCompleted) {
      listItem.classList.add("completed");
    }

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      taskListContainer.removeChild(listItem);
      saveTasks();
    });
    actionsDiv.appendChild(deleteButton);

    listItem.appendChild(actionsDiv);

    taskSpan.addEventListener("click", function () {
      listItem.classList.toggle("completed");
      saveTasks();
    });

    taskListContainer.appendChild(listItem);
  }

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    createTaskElement(taskText, false);
    saveTasks();

    taskInput.value = "";
    taskInput.focus();
  }

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  loadTasks();
});