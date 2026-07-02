const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

let tasks = [];
let nextId = 1;

app.get('/', (req, res) => { 
    res.render('index');    
});

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || title.trim() == '') {
        return res.status(400).json({ error: 'Task title is required.' });
    }

    const task = {
        id: nextId++,
        title: title.trim(),
        description: description ? description.trim() : '',
        priority: priority || 'medium',
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };

    tasks.push(task);
    res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error:'Task not found.' });
    }

    const { title, description, priority, completed } = req.body;

    if (title !== undefined) tasks[taskIndex].title = title.trim();
    if (description !== undefined) tasks[taskIndex].description = description.trim();
    if (priority !== undefined) tasks[taskIndex].priority = priority.trim();
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    
    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully.' })
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
