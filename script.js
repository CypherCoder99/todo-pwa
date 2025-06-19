let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="text-decoration: ${task.done ? 'line-through' : 'none'}">
        ${task.text}
      </span>
      <button onclick="toggleTask(${index})">✔</button>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text) {
    taskList.push({ text, done: false });
    input.value = '';
    saveAndRender();
  }
}

function toggleTask(index) {
  taskList[index].done = !taskList[index].done;
  saveAndRender();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTasks();
}

renderTasks();
