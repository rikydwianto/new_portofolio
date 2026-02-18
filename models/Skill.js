const db = require('../config/database');

class Skill {
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM skills ORDER BY sort_order ASC');
        return rows;
    }

    static async create(data) {
        const { title, description, icon_svg, color_class, sort_order } = data;
        await db.execute(
            'INSERT INTO skills (title, description, icon_svg, color_class, sort_order) VALUES (?, ?, ?, ?, ?)',
            [title, description, icon_svg, color_class, sort_order || 0]
        );
    }

    static async update(id, data) {
        const { title, description, icon_svg, color_class, sort_order } = data;
        await db.execute(
            'UPDATE skills SET title=?, description=?, icon_svg=?, color_class=?, sort_order=? WHERE id=?',
            [title, description, icon_svg, color_class, sort_order, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM skills WHERE id=?', [id]);
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM skills WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Skill;
