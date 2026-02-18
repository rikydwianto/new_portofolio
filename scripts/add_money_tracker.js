const pool = require('../config/database');

async function run() {
    try {
        console.log('🚀 Adding Money Tracker Project...');

        // 1. Create or Get Category "Mobile Flutter"
        // Check if exists first
        const [existingCat] = await pool.query("SELECT id FROM categories WHERE name LIKE '%Mobile Flutter%' LIMIT 1");

        let headerId;
        if (existingCat.length > 0) {
            headerId = existingCat[0].id;
            console.log(`✅ Category 'Mobile Flutter' found (ID: ${headerId})`);
        } else {
            const [newCat] = await pool.query("INSERT INTO categories (name, slug) VALUES (?, ?)", ['Mobile Flutter', 'mobile-flutter']);
            headerId = newCat.insertId;
            console.log(`✅ Created new Category 'Mobile Flutter' (ID: ${headerId})`);
        }

        // 2. Insert Project "Money Tracker"
        const title = "Money Tracker";
        const slug = "money-tracker-flutter";
        const description = "A multi-platform personal finance management application built with Flutter. Designed for personal use to track daily income, expenses, and analyze spending habits with intuitive charts. Runs seamlessly on Android and iOS.";
        const excerpt = "Multi-platform personal finance tracker built with Flutter for personal use.";
        const techStack = "Flutter, Dart, SQLite, LocalStorage";
        const mediaType = "image"; // Default to image since it's personal use (maybe screenshots)
        const thumbnail = "/uploads/projects/project-money-tracker.jpg"; // Placeholder path

        // Check if project exists to avoid duplicate
        const [existingProj] = await pool.query("SELECT id FROM projects WHERE slug = ?", [slug]);

        if (existingProj.length > 0) {
            console.log('⚠️  Project Money Tracker already exists. Updating it...');
            await pool.query(`
                UPDATE projects SET 
                category_id=?, title=?, description=?, excerpt=?, tech_stack=?, media_type=?, thumbnail=? 
                WHERE id=?
             `, [headerId, title, description, excerpt, techStack, mediaType, thumbnail, existingProj[0].id]);
        } else {
            await pool.query(`
                INSERT INTO projects (category_id, title, slug, description, excerpt, tech_stack, media_type, thumbnail, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
            `, [headerId, title, slug, description, excerpt, techStack, mediaType, thumbnail]);
            console.log('✅ Project Money Tracker inserted successfully!');
        }

        process.exit(0);

    } catch (err) {
        console.error('❌ Error adding project:', err);
        process.exit(1);
    }
}

run();
