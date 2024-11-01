/*
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
    // Create the users table with email field and unique constraints
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Users table created or already exists.");
        }
    });
});

// View all users endpoint - Access this in browser at http://localhost:3000/view-db
app.get('/view-db', (req, res) => {
    db.all("SELECT id, username, email, created_at FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Send response as formatted HTML
        let html = '<h2>Database Contents</h2>';
        html += '<table border="1" style="border-collapse: collapse; margin: 20px;">';
        html += '<tr><th>ID</th><th>Username</th><th>Email</th><th>Created At</th></tr>';
        
        rows.forEach(row => {
            html += `<tr>
                <td style="padding: 8px;">${row.id}</td>
                <td style="padding: 8px;">${row.username}</td>
                <td style="padding: 8px;">${row.email}</td>
                <td style="padding: 8px;">${row.created_at}</td>
            </tr>`;
        });
        
        html += '</table>';
        html += `<p>Total Users: ${rows.length}</p>`;
        
        res.send(html);
    });
});

// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert new user
        db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Registration error:", err);
                    return res.status(500).json({ message: "Error registering user" });
                }
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    
    db.get(query, [usernameOrEmail, usernameOrEmail], async (err, user) => {
        try {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username },
                'your_jwt_secret',
                { expiresIn: '24h' }
            );

            res.json({ token, user: { username: user.username, email: user.email } });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
});

// JSON view of database - Access this at http://localhost:3000/api/users
app.get('/api/users', (req, res) => {
    db.all("SELECT id, username, email, created_at FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            user_count: rows.length,
            users: rows
        });
    });
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });
        req.user = user; // Attach user data to request
        next();
    });
};

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./db/users.db');

db.serialize(() => {
    // Create the users table with email field and unique constraints
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Users table created or already exists.");
        }
    });
});

// View all users endpoint - Access this in browser at http://localhost:3000/view-db
app.get('/view-db', (req, res) => {
    db.all("SELECT id, username, email, created_at FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Send response as formatted HTML
        let html = '<h2>Database Contents</h2>';
        html += '<table border="1" style="border-collapse: collapse; margin: 20px;">';
        html += '<tr><th>ID</th><th>Username</th><th>Email</th><th>Created At</th></tr>';
        
        rows.forEach(row => {
            html += `<tr>
                <td style="padding: 8px;">${row.id}</td>
                <td style="padding: 8px;">${row.username}</td>
                <td style="padding: 8px;">${row.email}</td>
                <td style="padding: 8px;">${row.created_at}</td>
            </tr>`;
        });
        
        html += '</table>';
        html += `<p>Total Users: ${rows.length}</p>`;
        
        res.send(html);
    });
});

// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert new user
        db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Registration error:", err);
                    return res.status(500).json({ message: "Error registering user" });
                }
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    
    db.get(query, [usernameOrEmail, usernameOrEmail], async (err, user) => {
        try {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username },
                'your_jwt_secret',
                { expiresIn: '24h' }
            );

            res.json({ token, user: { username: user.username, email: user.email } });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// JSON view of database - Access this at http://localhost:3000/api/users
app.get('/api/users', (req, res) => {
    db.all("SELECT id, username, email, created_at FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            user_count: rows.length,
            users: rows
        });
    });
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
