const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'users.db');

class Database {
    constructor() {
        this.db = null;
    }

    connect() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
            } else {
                console.log('Connected to SQLite database.');
            }
        });
        return this.db;
    }

    initializeDatabase() {
        this.connect();
        
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        this.db.run(createTableSQL, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Users table ready');
            }
        });
    }

    insertUser(username, password, callback) {
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        
        this.db.run(sql, [username, password], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }
}

module.exports = new Database();