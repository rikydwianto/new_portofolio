const db = require('../config/database');

class Profile {
    static async get() {
        const [rows] = await db.execute('SELECT * FROM profile LIMIT 1');
        return rows[0] || null;
    }

    static async update(data) {
        const { id, name, hero_title, hero_desc, typewriter_text, about_title, about_desc_1, about_desc_2, email, phone, whatsapp_url, linkedin_url, github_url, available_for_work } = data;

        // Handle typewriter text properly (ensure it's stringified JSON if needed)
        let typewriter = typewriter_text;
        // If it comes as multiline string from textarea, convert to JSON array
        if (typeof typewriter === 'string' && !typewriter.startsWith('[')) {
            typewriter = JSON.stringify(typewriter.split('\n').map(s => s.trim()).filter(Boolean));
        }

        const [existing] = await db.execute('SELECT id FROM profile LIMIT 1');

        if (existing.length === 0) {
            // Insert
            await db.execute(
                `INSERT INTO profile (name, hero_title, hero_desc, typewriter_text, about_title, about_desc_1, about_desc_2, email, phone, whatsapp_url, linkedin_url, github_url, available_for_work) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, hero_title, hero_desc, typewriter, about_title, about_desc_1, about_desc_2, email, phone, whatsapp_url, linkedin_url, github_url, available_for_work ? 1 : 0]
            );
        } else {
            // Update
            await db.execute(
                `UPDATE profile SET 
                name=?, hero_title=?, hero_desc=?, typewriter_text=?, 
                about_title=?, about_desc_1=?, about_desc_2=?, 
                email=?, phone=?, whatsapp_url=?, linkedin_url=?, github_url=?, available_for_work=? 
                WHERE id=?`,
                [name, hero_title, hero_desc, typewriter, about_title, about_desc_1, about_desc_2, email, phone, whatsapp_url, linkedin_url, github_url, available_for_work ? 1 : 0, existing[0].id]
            );
        }
    }
}

module.exports = Profile;
