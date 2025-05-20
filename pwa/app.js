const quotes = [
    "Success is no accident.",
    "Victory loves preparation.",
    "Believe you can and you're halfway there."
];

function randomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = q;
}

function saveEntry() {
    const entry = document.getElementById('entry').value.trim();
    if (!entry) return;
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.unshift({ text: entry, date: new Date().toISOString() });
    localStorage.setItem('entries', JSON.stringify(entries));
    document.getElementById('entry').value = '';
    renderEntries();
}

function renderEntries() {
    const list = document.getElementById('entry-list');
    list.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = new Date(e.date).toLocaleString() + ': ' + e.text;
        list.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (!task) return;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({ text: task, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach((t, idx) => {
        const li = document.createElement('li');
        li.textContent = t.text;
        li.style.textDecoration = t.done ? 'line-through' : 'none';
        li.addEventListener('click', () => toggleTask(idx));
        list.appendChild(li);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}

randomQuote();
renderEntries();
renderTasks();

document.getElementById('save-entry').addEventListener('click', saveEntry);
document.getElementById('add-task').addEventListener('click', addTask);

