const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');
const themeSwitcher = document.getElementById('themeSwitcher');

// Load theme
themeSwitcher.addEventListener('change', () => {
  document.body.className = themeSwitcher.value + '-theme';
  localStorage.setItem('theme', themeSwitcher.value);
});

// Load saved theme
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'pastel';
  document.body.className = savedTheme + '-theme';
  themeSwitcher.value = savedTheme;

  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('span').innerText;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, completed = false) {
  if (!text.trim()) return alert('Task cannot be empty!');

  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.innerText = text;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const checkBtn = document.createElement('button');
  checkBtn.innerText = '✅';
  checkBtn.title = "Mark Completed";
  checkBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const editBtn = document.createElement('button');
  editBtn.innerText = '📝';
  editBtn.title = "Edit Task";
  editBtn.onclick = () => {
    const newText = prompt('Edit your task:', span.innerText);
    if (newText !== null && newText.trim() !== '') {
      span.innerText = newText;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = '❌';
  deleteBtn.title = "Delete Task";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(checkBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);

  saveTasks();
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value;
  addTask(text);
  taskInput.value = '';
});

clearAllBtn.addEventListener('click', () => {
  if (confirm("Clear all tasks?")) {
    taskList.innerHTML = '';
    saveTasks();
  }
});
