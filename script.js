function addTask() {
  const date = document.getElementById("task-date").value;
  const taskText = document.getElementById("task-input").value.trim();
  

  if (!taskText) return;

  const key = date || "default";
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  tasks.push({ text: taskText, completed: false, date: date || null });
  localStorage.setItem(key, JSON.stringify(tasks));

  document.getElementById("task-input").value = "";
  loadTasks(key);
}

function loadTasks(date) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem(date)) || [];
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task-bubble";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTask(date, index);

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(date, index);

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(delBtn);

    if (task.date) {
      const dateSpan = document.createElement("small");
      dateSpan.textContent = ` (${new Date(task.date).toDateString()})`;
      dateSpan.className = "task-date";
      div.appendChild(dateSpan);
    }

    taskList.appendChild(div);
  });
}

function toggleTask(date, index) {
  const tasks = JSON.parse(localStorage.getItem(date)) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem(date, JSON.stringify(tasks));
  loadTasks(date);
}

function deleteTask(date, index) {
  const tasks = JSON.parse(localStorage.getItem(date)) || [];
  tasks.splice(index, 1);
  localStorage.setItem(date, JSON.stringify(tasks));
  loadTasks(date);
}

function changeTheme() {
  const theme = document.getElementById("theme-select").value;
  document.body.className = theme;
}

document.getElementById("task-date").addEventListener("change", (e) => {
  loadTasks(e.target.value || "default");
  loadTasks(value || "default");
});
