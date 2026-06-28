const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const DATA_FILE = path.join(__dirname, 'users.json');

let users = [];
let nextId = 1;

const saveUsersToFile = () => {
    const data = {
        users,
        nextId
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const loadUsersFromFile = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        users = data.users || [];
        nextId = data.nextId || 1;
    }
};

loadUsersFromFile();

const validateUser = (req, res, next) => {
    const { name, age, email, eyecolor } = req.body;
    
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'name is required' });
    }
    
    if (age === undefined || age === null) {
        return res.status(400).json({ error: 'age is required' });
    }
    
    if (age < 10 || age > 30) {
        return res.status(400).json({ error: 'age must be between 10 and 30' });
    }
    
    next();
};

app.post('/users', validateUser, (req, res) => {
    const { name, age, email, eyecolor } = req.body;
    
    const user = {
        id: nextId++,
        name: name.trim(),
        age: parseInt(age),
        email: email || null,
        eyecolor: eyecolor || null
    };
    
    users.push(user);
    saveUsersToFile();
    res.status(201).json(user);
});

app.get('/users', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    
    let filteredUsers = [...users];
    
    if (search) {
        const searchLower = search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchLower) ||
            (user.email && user.email.toLowerCase().includes(searchLower))
        );
    }
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
        users: paginatedUsers,
        currentPage: pageNum,
        totalPages: Math.ceil(filteredUsers.length / limitNum),
        totalUsers: filteredUsers.length
    });
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

app.put('/users/:id', validateUser, (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { name, age, email, eyecolor } = req.body;
    
    users[userIndex] = {
        ...users[userIndex],
        name: name.trim(),
        age: parseInt(age),
        email: email || null,
        eyecolor: eyecolor || null
    };
    
    saveUsersToFile();
    res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    saveUsersToFile();
    res.json({ message: 'User deleted successfully', user: deletedUser });
});

app.get('/users/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const results = users.filter(user => 
        user.name.toLowerCase().includes(query) ||
        (user.email && user.email.toLowerCase().includes(query))
    );
    
    res.json({ users: results, count: results.length });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
