const db = require('../config/database');

class User {
    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
    static async update(id, username, passwordHash, fullName) {
        if (passwordHash) {
            await db.execute('UPDATE users SET username=?, password_hash=?, full_name=? WHERE id=?', [username, passwordHash, fullName, id]);
        } else {
            await db.execute('UPDATE users SET username=?, full_name=? WHERE id=?', [username, fullName, id]);
        }
    }
}

module.exports = User;
