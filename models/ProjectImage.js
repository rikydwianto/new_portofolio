const db = require('../config/database');

class ProjectImage {
    static async findByProjectId(projectId) {
        const [rows] = await db.execute(
            'SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC',
            [projectId]
        );
        return rows;
    }

    static async getThumbnail(projectId) {
        const [rows] = await db.execute(
            'SELECT * FROM project_images WHERE project_id = ? AND is_thumbnail = 1 LIMIT 1',
            [projectId]
        );
        return rows[0];
    }

    static async create(data) {
        const { project_id, image_url, is_thumbnail, sort_order } = data;
        const [result] = await db.execute(
            'INSERT INTO project_images (project_id, image_url, is_thumbnail, sort_order) VALUES (?, ?, ?, ?)',
            [project_id, image_url, is_thumbnail || 0, sort_order || 0]
        );
        return result.insertId;
    }

    static async setThumbnail(projectId, imageId) {
        // Reset all thumbnails for this project
        await db.execute('UPDATE project_images SET is_thumbnail = 0 WHERE project_id = ?', [projectId]);
        // Set the new thumbnail
        await db.execute('UPDATE project_images SET is_thumbnail = 1 WHERE id = ? AND project_id = ?', [imageId, projectId]);
    }

    static async delete(id) {
        await db.execute('DELETE FROM project_images WHERE id = ?', [id]);
    }

    static async deleteByProjectId(projectId) {
        await db.execute('DELETE FROM project_images WHERE project_id = ?', [projectId]);
    }
}

module.exports = ProjectImage;
