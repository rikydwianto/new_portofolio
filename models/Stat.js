const db = require('../config/database');

class Stat {
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM stats ORDER BY sort_order ASC');
        return rows;
    }

    static async create(data) {
        const { number, suffix, label, sort_order } = data;
        await db.execute(
            'INSERT INTO stats (number, suffix, label, sort_order) VALUES (?, ?, ?, ?)',
            [number, suffix, label, sort_order || 0]
        );
    }

    static async update(id, data) {
        const { number, suffix, label, sort_order } = data;
        await db.execute(
            'UPDATE stats SET number=?, suffix=?, label=?, sort_order=? WHERE id=?',
            [number, suffix, label, sort_order, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM stats WHERE id=?', [id]);
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM stats WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Stat;
