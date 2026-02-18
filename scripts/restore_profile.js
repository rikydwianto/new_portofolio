const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

async function run() {
    try {
        const backupFile = path.join(__dirname, '../database/backups/backup_before_seed_2026-02-18T16-05-55-534Z.json');

        if (!fs.existsSync(backupFile)) {
            console.error('❌ Backup file not found!');
            process.exit(1);
        }

        const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
        const oldProfile = data.profile[0];

        if (!oldProfile) {
            console.error('❌ No profile data in backup!');
            process.exit(1);
        }

        console.log('🔄 Restoring Old Profile Data...');
        console.log(`Hero Title: ${oldProfile.hero_title}`);
        console.log(`Hero Desc: ${oldProfile.hero_desc}`);

        // Update Profile Table
        await pool.query(`TRUNCATE TABLE profile`); // Clear current

        await pool.query(`
            INSERT INTO profile (
                name, hero_title, hero_desc, typewriter_text, 
                about_title, about_desc_1, about_desc_2, 
                email, phone, whatsapp_url, linkedin_url, github_url, 
                available_for_work, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
            oldProfile.name,
            oldProfile.hero_title,
            oldProfile.hero_desc,
            oldProfile.typewriter_text,
            oldProfile.about_title,
            oldProfile.about_desc_1,
            oldProfile.about_desc_2,
            oldProfile.email,
            oldProfile.phone,
            oldProfile.whatsapp_url,
            oldProfile.linkedin_url,
            oldProfile.github_url,
            oldProfile.available_for_work
        ]);

        console.log('✅ Profile Restored Successfully!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error restoring profile:', err);
        process.exit(1);
    }
}

run();
