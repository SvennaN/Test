const { useState, useEffect } = React;

function App() {
    const quotes = [
        "Success is no accident.",
        "Victory loves preparation.",
        "Believe you can and you're halfway there.",
        "Small steps every day lead to big results.",
    ];

    const prompts = [
        "What went well today?",
        "Did you face any challenges?",
        "What are you grateful for?",
        "How will you improve tomorrow?",
    ];

    const affirmations = [
        "You are on the right track.",
        "Keep pushing, progress is near.",
        "Your consistency builds strength.",
        "Every entry counts toward your goal.",
    ];

    const [quote, setQuote] = useState('');
    const [prompt, setPrompt] = useState('');
    const [affirmation, setAffirmation] = useState('');

    const [entries, setEntries] = useState([]);
    const [entryText, setEntryText] = useState('');
    const [mood, setMood] = useState('neutral');
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [streak, setStreak] = useState(0);

    const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
        const storedEntries = JSON.parse(localStorage.getItem('entries') || '[]');
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{"todo":[],"doing":[],"done":[]}');
        setEntries(storedEntries);
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
        updateStreak(entries);
    }, [entries]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function updateStreak(list) {
        if (list.length === 0) { setStreak(0); return; }
        let s = 1;
        let prev = new Date(list[0].date);
        for (let i = 1; i < list.length; i++) {
            const cur = new Date(list[i].date);
            const diff = (prev - cur) / (24 * 60 * 60 * 1000);
            if (diff > 1.5) break;
            s++;
            prev = cur;
        }
        setStreak(s);
    }

    function startRecording() {
        setRecordedChunks([]);
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const rec = new MediaRecorder(stream);
            rec.ondataavailable = e => setRecordedChunks(chunks => [...chunks, e.data]);
            rec.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.onloadend = () => setCurrentAudio(reader.result);
                reader.readAsDataURL(blob);
            };
            rec.start();
            setMediaRecorder(rec);
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
        reader.onloadend = () => setCurrentImage(reader.result);
        reader.readAsDataURL(file);
    }

    function saveEntry() {
        if (!entryText && !currentAudio && !currentImage) return;
        const entry = {
            text: entryText,
            date: new Date().toISOString(),
            mood,
            audio: currentAudio,
            image: currentImage
        };
        setEntries([entry, ...entries]);
        setEntryText('');
        setMood('neutral');
        setCurrentAudio(null);
        setCurrentImage(null);
        setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
        setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }

    function addTask() {
        if (!taskText.trim()) return;
        setTasks({ ...tasks, todo: [...tasks.todo, { text: taskText }] });
        setTaskText('');
    }

    function advanceTask(col, index) {
        const newTasks = { ...tasks };
        const item = newTasks[col].splice(index, 1)[0];
        if (col === 'todo') newTasks.doing.push(item);
        else if (col === 'doing') newTasks.done.push(item);
        setTasks(newTasks);
    }

    const totalTasks = tasks.todo.length + tasks.doing.length + tasks.done.length;
    const progress = totalTasks ? Math.round((tasks.done.length / totalTasks) * 100) : 0;

    return (
        <div className="container">
            <header>
                <h1>Mindful Motion</h1>
                <p className="quote">{quote}</p>
            </header>
            <div className="prompt">{prompt}</div>
            {affirmation && <div className="affirmation">{affirmation}</div>}
            <div className="streak">Streak: {streak} day{streak === 1 ? '' : 's'}</div>
            <section className="journal">
                <textarea value={entryText} onChange={e => setEntryText(e.target.value)} placeholder="Write your thoughts..."></textarea>
                <div className="controls">
                    <select value={mood} onChange={e => setMood(e.target.value)}>
                        <option value="happy">😊 Happy</option>
                        <option value="neutral">😐 Neutral</option>
                        <option value="sad">😔 Sad</option>
                    </select>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <button onClick={startRecording}>Record</button>
                    <button onClick={stopRecording}>Stop</button>
                </div>
                {currentImage && <img className="preview" src={currentImage} />}
                {currentAudio && <audio controls src={currentAudio}></audio>}
                <button onClick={saveEntry}>Save Entry</button>
            </section>
            <section className="entries">
                <h2>Entries</h2>
                <ul>
                    {entries.map((e, idx) => (
                        <li key={idx}>
                            <div>{new Date(e.date).toLocaleString()} – {e.text}</div>
                            {e.image && <img className="entry-image" src={e.image} />}
                            {e.audio && <audio controls src={e.audio}></audio>}
                        </li>
                    ))}
                </ul>
            </section>
            <section className="tasks">
                <h2>Tasks</h2>
                <div className="task-input">
                    <input type="text" value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="New task" />
                    <button onClick={addTask}>Add</button>
                </div>
                <div className="progress">Progress: {progress}%</div>
                <div className="board">
                    {['todo', 'doing', 'done'].map(col => (
                        <div key={col} className="column">
                            <h3>{col === 'todo' ? 'To Do' : col === 'doing' ? 'Doing' : 'Done'}</h3>
                            <ul>
                                {tasks[col].map((t, idx) => (
                                    <li key={idx} onClick={() => advanceTask(col, idx)}>{t.text}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}
