const db = require('../config/database');

class Badge {
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM badges ORDER BY sort_order ASC');
        return rows;
    }

    static async create(data) {
        const { text, css_class, sort_order } = data;
        await db.execute(
            'INSERT INTO badges (text, css_class, sort_order) VALUES (?, ?, ?)',
            [text, css_class, sort_order || 0]
        );
    }

    static async update(id, data) {
        const { text, css_class, sort_order } = data;
        await db.execute(
            'UPDATE badges SET text=?, css_class=?, sort_order=? WHERE id=?',
            [text, css_class, sort_order, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM badges WHERE id=?', [id]);
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM badges WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Badge;
