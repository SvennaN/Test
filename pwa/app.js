const quotes = [
    "Success is no accident.",
    "Victory loves preparation.",
    "Believe you can and you're halfway there."
];

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

function encrypt(text) {
    // TODO: implement real encryption
    return text;
}

function decrypt(text) {
    // TODO: implement real decryption
    return text;
}

function randomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = q;
}

function randomPrompt() {
    const p = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById('prompt').textContent = p;
}

function updateStreak(onSave = false) {
    const streakEl = document.getElementById('streak');
    let streak = parseInt(localStorage.getItem('streakCount') || '0');
    let last = localStorage.getItem('lastEntryDate');
    const today = new Date().toISOString().split('T')[0];

    if (onSave) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (last === today) {
            if (!streak) streak = 1;
        } else if (last === yesterday) {
            streak += 1;
        } else {
            streak = 1;
        }
        localStorage.setItem('streakCount', String(streak));
        localStorage.setItem('lastEntryDate', today);

        if ([3, 7, 30].includes(streak)) {
            alert(`Badge unlocked: ${streak} day streak!`);
        }
    }

    streakEl.textContent = `Streak: ${streak} day${streak === 1 ? '' : 's'}`;
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
    document.getElementById('audio-playback').style.display = 'none';
    currentAudio = null;
    currentImage = null;
    document.getElementById('image-input').value = '';
    updateStreak(true);
    renderEntries();
}

function renderEntries() {
    const list = document.getElementById('entry-list');
    list.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.forEach(e => {
        const li = document.createElement('li');
        const header = document.createElement('div');
        header.textContent = new Date(e.date).toLocaleString();
        li.appendChild(header);
        if (e.text) {
            const p = document.createElement('p');
            p.textContent = decrypt(e.text);
            li.appendChild(p);
        }
        if (e.image) {
            const img = document.createElement('img');
            img.src = e.image;
            img.style.maxWidth = '100%';
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

function addTask() {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (!task) return;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({ text: encrypt(task), done: false });
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
        li.textContent = decrypt(t.text);
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
randomPrompt();
updateStreak();
renderEntries();
renderTasks();

document.getElementById('save-entry').addEventListener('click', saveEntry);
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('image-input').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        currentImage = reader.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('record-btn').addEventListener('click', async () => {
    const btn = document.getElementById('record-btn');
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        btn.textContent = 'Record Audio';
    } else {
        recordedChunks = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
        btn.textContent = 'Stop Recording';
    }
});

