const db = require('../config/database');

class VisitorLog {
    static async create(data) {
        const { ip_address, city, region, country, isp, user_agent, page_visited, project_slug, referrer } = data;
        const [result] = await db.execute(
            `INSERT INTO visitor_logs (ip_address, city, region, country, isp, user_agent, page_visited, project_slug, referrer)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ip_address, city || null, region || null, country || null, isp || null, user_agent || null, page_visited, project_slug || null, referrer || null]
        );
        return result.insertId;
    }

    static async findAll(limit = 100) {
        const [rows] = await db.execute(
            'SELECT * FROM visitor_logs ORDER BY visited_at DESC LIMIT ?',
            [String(limit)]
        );
        return rows;
    }

    static async findByPage(page, limit = 50) {
        const [rows] = await db.execute(
            'SELECT * FROM visitor_logs WHERE page_visited = ? ORDER BY visited_at DESC LIMIT ?',
            [page, String(limit)]
        );
        return rows;
    }

    static async getStats() {
        const [totalVisits] = await db.execute('SELECT COUNT(*) as count FROM visitor_logs');
        const [uniqueIPs] = await db.execute('SELECT COUNT(DISTINCT ip_address) as count FROM visitor_logs');
        const [todayVisits] = await db.execute(
            'SELECT COUNT(*) as count FROM visitor_logs WHERE DATE(visited_at) = CURDATE()'
        );
        const [topPages] = await db.execute(
            `SELECT page_visited, COUNT(*) as visits 
             FROM visitor_logs 
             GROUP BY page_visited 
             ORDER BY visits DESC LIMIT 10`
        );
        const [topCountries] = await db.execute(
            `SELECT country, COUNT(*) as visits 
             FROM visitor_logs 
             WHERE country IS NOT NULL AND country != ''
             GROUP BY country 
             ORDER BY visits DESC LIMIT 10`
        );
        const [recentVisitors] = await db.execute(
            'SELECT * FROM visitor_logs ORDER BY visited_at DESC LIMIT 20'
        );
        const [projectViews] = await db.execute(
            `SELECT project_slug, COUNT(*) as views 
             FROM visitor_logs 
             WHERE project_slug IS NOT NULL AND project_slug != ''
             GROUP BY project_slug 
             ORDER BY views DESC LIMIT 10`
        );

        return {
            totalVisits: totalVisits[0].count,
            uniqueVisitors: uniqueIPs[0].count,
            todayVisits: todayVisits[0].count,
            topPages,
            topCountries,
            recentVisitors,
            projectViews
        };
    }

    static async deleteOlderThan(days) {
        await db.execute(
            'DELETE FROM visitor_logs WHERE visited_at < DATE_SUB(NOW(), INTERVAL ? DAY)',
            [String(days)]
        );
    }
}

module.exports = VisitorLog;
