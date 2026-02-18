const db = require('../config/database');

class Project {
    static async findAll() {
        const [rows] = await db.execute(`
            SELECT p.*, c.name as category_name 
            FROM projects p 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.created_at DESC
        `);
        return rows;
    }

    static async findBySlug(slug) {
        const [rows] = await db.execute(`
             SELECT p.*, c.name as category_name 
             FROM projects p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.slug = ?
         `, [slug]);
        return rows[0];
    }


    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack } = data;
        const [result] = await db.execute(
            'INSERT INTO projects (category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const { category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack } = data;
        await db.execute(
            'UPDATE projects SET category_id=?, title=?, slug=?, description=?, excerpt=?, thumbnail=?, media_type=?, media_url=?, tech_stack=? WHERE id=?',
            [category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM projects WHERE id = ?', [id]);
    }
}

module.exports = Project;
