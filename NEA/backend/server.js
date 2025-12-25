const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware - NO CORS NEEDED when serving from same origin
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Database setup
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Signup endpoint
app.post('.../signup', async (req, res) => {
    console.log('📨 Signup request received:', req.body);
    
    const { username, password, confirmPassword } = req.body;

    // Validation
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if username exists
    db.get('SELECT id FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Insert user
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', 
                [username, hashedPassword], 
                function(err) {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Failed to create user' });
                    }
                    
                    console.log('User created with ID:', this.lastID);
                    res.json({ 
                        message: 'User created successfully!', 
                        userId: this.lastID 
                    });
                }
            );
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Signup form: http://localhost:${PORT}/signup.html`);
});