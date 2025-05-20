const quotes = [
    "Success is no accident.",
    "Victory loves preparation.",
    "Believe you can and you're halfway there."
];

// Journal prompts used to inspire daily entries
const prompts = [
    "What went well today?",
    "Did you face any challenges?",
    "What are you grateful for?",
    "How will you improve tomorrow?"
];

let mediaRecorder;
let recordedChunks = [];
let currentAudio = null;
let currentImage = null;

// Placeholder encryption routines. Replace with real AES if needed.
function encrypt(text) {
    return text;
}

function decrypt(text) {
    return text;
}

function randomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = q;
}

function showPrompt() {
    const p = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById('prompt').textContent = p;
}

function startRecording() {
    recordedChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.onloadend = () => {
                currentAudio = reader.result;
                const audioEl = document.getElementById('audio-playback');
                audioEl.src = currentAudio;
                audioEl.style.display = 'block';
            };
            reader.readAsDataURL(blob);
        };
        mediaRecorder.start();
    });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
        currentImage = reader.result;
        const img = document.getElementById('image-preview');
        img.src = currentImage;
        img.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function saveEntry() {
    const entry = document.getElementById('entry').value.trim();
    if (!entry && !currentAudio && !currentImage) return;

    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.unshift({
        text: encrypt(entry),
        date: new Date().toISOString(),
        audio: currentAudio,
        image: currentImage
    });
    localStorage.setItem('entries', JSON.stringify(entries));

    document.getElementById('entry').value = '';
    currentAudio = null;
    currentImage = null;
    document.getElementById('audio-playback').style.display = 'none';
    document.getElementById('image-preview').style.display = 'none';
    showPrompt();
    renderEntries();
    updateStreak();
}

function renderEntries() {
    const list = document.getElementById('entry-list');
    list.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.forEach(e => {
        const li = document.createElement('li');
        const text = document.createElement('div');
        text.textContent = new Date(e.date).toLocaleString() + ': ' + decrypt(e.text);
        li.appendChild(text);

        if (e.image) {
            const img = document.createElement('img');
            img.src = e.image;
            img.className = 'entry-image';
            li.appendChild(img);
        }

        if (e.audio) {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = e.audio;
            li.appendChild(audio);
        }
        list.appendChild(li);
    });
}

function updateStreak() {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    if (entries.length === 0) {
        document.getElementById('streak').textContent = 'Streak: 0';
        return;
    }

    let streak = 1;
    let prev = new Date(entries[0].date);
    for (let i = 1; i < entries.length; i++) {
        const cur = new Date(entries[i].date);
        const diff = (prev - cur) / (24 * 60 * 60 * 1000);
        if (diff > 1.5) break;
        streak++;
        prev = cur;
    }
    document.getElementById('streak').textContent = 'Streak: ' + streak;
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
showPrompt();
renderEntries();
renderTasks();
updateStreak();

document.getElementById('save-entry').addEventListener('click', saveEntry);
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('record-start').addEventListener('click', startRecording);
document.getElementById('record-stop').addEventListener('click', stopRecording);
document.getElementById('image-input').addEventListener('change', handleImageUpload);

