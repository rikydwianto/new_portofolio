const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    let connection;
    try {
        console.log('🔌 Connecting to MySQL...');
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            multipleStatements: true
        });

        // Drop and recreate database for fresh start
        console.log(`🗄️  Recreating database '${process.env.DB_NAME}'...`);
        await connection.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\``);
        await connection.query(`CREATE DATABASE \`${process.env.DB_NAME}\``);
        await connection.query(`USE \`${process.env.DB_NAME}\``);

        // Run all migration files in order
        const migrationsDir = path.join(__dirname, 'database', 'migrations');
        const migrationFiles = fs.readdirSync(migrationsDir).sort();

        for (const file of migrationFiles) {
            if (file.endsWith('.sql')) {
                console.log(`📝 Running migration: ${file}`);
                const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
                if (sql.trim()) {
                    await connection.query(sql);
                }
            }
        }

        // Generate proper bcrypt hash for admin123
        console.log('🔑 Creating admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await connection.query(
            'INSERT INTO users (username, password_hash, full_name) VALUES (?, ?, ?)',
            ['admin', hashedPassword, 'Riky Dwianto']
        );

        // Insert categories
        console.log('📁 Inserting categories...');
        await connection.query(`
            INSERT INTO categories (name, slug) VALUES 
            ('Web Development', 'web-development'),
            ('Mobile Apps', 'mobile-apps'),
            ('AI Projects', 'ai-projects'),
            ('UI/UX Design', 'ui-ux-design')
        `);

        // Insert timeline
        console.log('📅 Inserting timeline...');
        await connection.query(`
            INSERT INTO timeline (year_range, title, subtitle, description, type, order_index) VALUES 
            ('2023 - Present', 'Senior Full Stack Developer', 'Tech Innovation Corp.', 'Leading development of enterprise web applications using Node.js, React, and cloud services. Managing a team of 5 developers.', 'experience', 1),
            ('2021 - 2023', 'Full Stack Developer', 'Digital Agency Co.', 'Built 20+ client websites and web applications. Specialized in Express.js, MySQL, and responsive design.', 'experience', 2),
            ('2019 - 2021', 'Junior Web Developer', 'Startup Hub', 'Developed frontend interfaces and REST APIs. Learned mobile development with React Native.', 'experience', 3),
            ('2015 - 2019', 'S.Kom - Computer Science', 'Universitas Teknologi', 'Graduated with honors. Focus on Software Engineering and Artificial Intelligence.', 'education', 4),
            ('2023', 'AWS Certified Developer', 'Amazon Web Services', 'Associate level certification for cloud development.', 'certification', 5)
        `);

        // Insert sample projects
        console.log('🚀 Inserting sample projects...');
        await connection.query(`
            INSERT INTO projects (category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack) VALUES 
            (1, 'E-Commerce Platform', 'e-commerce-platform', 'A full-featured e-commerce platform with user authentication, product management, shopping cart, payment integration with Midtrans, and order tracking.', 'Full-stack e-commerce with payment integration', '/uploads/projects/placeholder.jpg', 'web_link', 'https://example.com', 'Node.js, Express, MySQL, EJS, Midtrans'),
            (1, 'Point of Sale System', 'point-of-sale-system', 'Complete POS system for retail businesses. Features include inventory management, sales reporting, multi-user roles, receipt printing, and real-time dashboard analytics.', 'Modern POS system for retail businesses', '/uploads/projects/placeholder.jpg', 'web_link', 'https://example.com', 'Node.js, Express, MySQL, Chart.js'),
            (2, 'Health Tracker App', 'health-tracker-app', 'Mobile application for tracking daily health metrics including steps, calories, water intake, and sleep patterns.', 'Mobile health tracking with analytics', '/uploads/projects/placeholder.jpg', 'image', '', 'React Native, Firebase, Redux'),
            (3, 'Chatbot AI Assistant', 'chatbot-ai-assistant', 'An intelligent chatbot powered by natural language processing for customer service automation.', 'AI-powered customer service chatbot', '/uploads/projects/placeholder.jpg', 'web_link', 'https://example.com', 'Python, TensorFlow, Flask, NLP'),
            (4, 'Brand Identity Redesign', 'brand-identity-redesign', 'Complete brand identity redesign for a fintech startup. Includes logo, color palette, and comprehensive brand guidelines.', 'Complete brand identity for fintech startup', '/uploads/projects/placeholder.jpg', 'image', '', 'Figma, Illustrator, Photoshop'),
            (1, 'Learning Management System', 'learning-management-system', 'Online learning platform with video courses, quizzes, progress tracking, and instructor dashboard.', 'Online learning platform with video courses', '/uploads/projects/placeholder.jpg', 'web_link', 'https://example.com', 'Node.js, Express, MongoDB, Socket.io')
        `);

        console.log('');
        console.log('✅ Database setup completed successfully!');
        console.log('   Admin user: admin / admin123');
        console.log('   Categories: 4');
        console.log('   Timeline entries: 5');
        console.log('   Sample projects: 6');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        if (connection) await connection.end();
    }
}

setupDatabase();
