const db = require('../config/database');

class Category {
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM categories ORDER BY name ASC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { name, slug } = data;
        const [result] = await db.execute('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, slug]);
        return result.insertId;
    }

    static async update(id, data) {
        const { name, slug } = data;
        await db.execute('UPDATE categories SET name = ?, slug = ? WHERE id = ?', [name, slug, id]);
    }

    static async delete(id) {
        await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    }
}

module.exports = Category;
