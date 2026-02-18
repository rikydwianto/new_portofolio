const db = require('../config/database');

class Timeline {
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM timeline ORDER BY order_index ASC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM timeline WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { year_range, title, subtitle, description, type, order_index } = data;
        const [result] = await db.execute(
            'INSERT INTO timeline (year_range, title, subtitle, description, type, order_index) VALUES (?, ?, ?, ?, ?, ?)',
            [year_range, title, subtitle, description, type, order_index]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { year_range, title, subtitle, description, type, order_index } = data;
        await db.execute(
            'UPDATE timeline SET year_range = ?, title = ?, subtitle = ?, description = ?, type = ?, order_index = ? WHERE id = ?',
            [year_range, title, subtitle, description, type, order_index, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM timeline WHERE id = ?', [id]);
    }
}

module.exports = Timeline;
