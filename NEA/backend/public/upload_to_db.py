import json
import sqlite3

def upload():
    # Read JSON file
    with open("mid.json", "r") as f:
        data = json.load(f)

    username = data["username"]
    password = data["password"]

    # Connect to SQLite database
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # Create table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    """)

    # Insert data
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, password)
    )

    conn.commit()
    conn.close()