const taskInput = document.querySelector("#input-text");
const addBtn = document.querySelector("#Add");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("Task")) || [];
let editIndex = null;

renderTasks();

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (!task) return;

  if (editIndex === null) {
    tasks.push(task);
  } else {
    tasks[editIndex] = task;
    editIndex = null;
    addBtn.innerText = "Add";
  }

  saveAndRender();
  taskInput.value = "";
});

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("Add").click();
  }
});

function saveAndRender() {
  localStorage.setItem("Task", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "input-group";
    div.innerHTML = `
      <div class="input">
        <input type="checkbox" />
        <span>${task}</span>
      </div>

      <div class="icons">
        <div class="edit" data-index="${index}">
          <i class="fa-solid fa-pen"></i>
        </div>
        <div class="delete" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    `;

    taskList.appendChild(div);
  });
}

taskList.addEventListener("click", (e) => {
  if (e.target.closest(".delete")) {
    const index = e.target.closest(".delete").dataset.index;
    tasks.splice(index, 1);
    saveAndRender();
  }

  if (e.target.closest(".edit")) {
    const index = e.target.closest(".edit").dataset.index;
    taskInput.value = tasks[index];
    editIndex = index;
    addBtn.innerText = "Update";
    taskInput.focus();
  }
});
