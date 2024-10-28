const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./db/users.db');

db.serialize(() => {
    // Create the users table if it does not already exist
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)", (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Users table created or already exists.");
        }
    });
});


// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
        if (err) return res.status(500).send("Error registering user.");
        res.status(201).send("User registered successfully.");
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user) return res.status(400).send("User not found.");
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ username }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).send("Invalid credentials.");
        }
    });
});

// Serve HTML file on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
