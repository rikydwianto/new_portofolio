const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../database/backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

async function run() {
    try {
        console.log('🔄 Starting Data Transfer (Backup & Seed)...');

        // Note: Table names must match exact DB names
        const tables = ['timeline', 'projects', 'categories', 'skills', 'stats', 'badges', 'profile'];
        const backupData = {};

        // 1. BACKUP DATA
        for (const table of tables) {
            try {
                const [rows] = await pool.query(`SELECT * FROM ${table}`);
                backupData[table] = rows;
            } catch (e) {
                console.warn(`⚠️  Warning backup table ${table}: ${e.message}`);
            }
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFile = path.join(backupDir, `backup_before_seed_${timestamp}.json`);
        // fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2)); // Optional: disable to save disk space
        console.log(`✅ Old data backed up to: ${backupFile}`);

        // 2. CLEAR TABLES
        await pool.query('SET FOREIGN_KEY_CHECKS = 0');
        for (const table of tables) {
            try {
                await pool.query(`TRUNCATE TABLE ${table}`);
            } catch (e) {
                console.warn(`⚠️  Warning truncate table ${table}: ${e.message}`);
            }
        }
        await pool.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('🗑️  Old data cleared.');

        // 3. INSERT NEW DATA
        console.log('🌱 Seeding new Riky Dwianto data...');

        // --- Categories ---
        const [catWeb] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['Web Development', 'web-development']);
        const [catMobile] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['Mobile App', 'mobile-app']);
        const [catSystem] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['Enterprise Systems', 'enterprise-systems']);
        const [catGov] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['Government & Workflow', 'gov-workflow']);
        const [catIot] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['IoT & Hardware Integration', 'iot-hardware']);

        const idWeb = catWeb.insertId;
        const idMobile = catMobile.insertId;
        const idSystem = catSystem.insertId;
        const idGov = catGov.insertId;
        const idIot = catIot.insertId;

        // --- Profile ---
        await pool.query(`
            INSERT INTO profile (
                name, hero_title, hero_desc, typewriter_text, 
                about_title, about_desc_1, about_desc_2, 
                email, phone, whatsapp_url, linkedin_url, github_url, 
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
            'Riky Dwianto',
            "Hi, I'm <span class='gradient-text'>Riky Dwianto</span>",
            "A seasoned Full Stack Developer with 8+ years of experience in building high-performance Enterprise Systems, Mobile Apps, and Digital Transformation solutions.",

            // Typewriter text
            JSON.stringify(["Full Stack Developer", "Mobile App Engineer", "System Architect", "AI Enthusiast"]),

            "My Professional Journey",
            "I started my career as an IT Support specialist in 2016 and rapidly evolved into a comprehensive **Full Stack Developer**. My expertise spans across **Node.js, Laravel, Flutter, and Cloud Infrastructure**.",
            "Currently, I lead the digital transformation initiatives at **KOMIDA Head Office**, architecting robust HRIS platforms, Financial Monitoring Systems, and ensuring seamless API integrations for enterprise-scale operations.",

            "rikydwianto016@gmail.com",
            "0812-1465-7370",
            "https://wa.me/6281214657370",
            "https://linkedin.com/in/rikydwianto",
            "https://github.com/rikydwianto"
        ]);

        // --- Timeline (Experience) ---
        const experiences = [
            [
                'Jul 2024 - Present',
                'Full Stack Developer',
                'KOMIDA Head Office (Jakarta)',
                'Leading the development of internal digital ecosystems. Key projects include a comprehensive HRIS (Web & Mobile), KPI Monitoring System, and Cashflow Targeting System. Responsible for REST API integration and system deployment.',
                'experience', 1
            ],
            [
                'Jul 2023 - Jul 2024',
                'Community Development Officer',
                'KOMIDA (Bandung)',
                'Managed community development programs and conducted in-depth operational data analysis to improve service effectiveness.',
                'experience', 2
            ],
            [
                'Feb 2021 - Jul 2023',
                'Management Information System (MIS) Officer',
                'KOMIDA',
                'Spearheaded the management of branch operational reports and developed internal tools to streamline data processing.',
                'experience', 3
            ],
            [
                '2017 - 2021',
                'Field Staff',
                'KOMIDA',
                'Executed field operations, managed member data acquisition, and ensured accurate branch activity reporting.',
                'experience', 4
            ],
            [
                '2016 - 2017',
                'IT Support',
                'PT. Lydia Sola Gracia',
                'Combined development and support roles: built HRIS and Warehouse systems while maintaining company hardware, software, and IT infrastructure.',
                'experience', 5
            ],
            [
                '2016',
                'IT Server Staff',
                'CV. Graha Simas Sejati',
                'Ensured uptime and reliability of company servers and monitored network systems.',
                'experience', 6
            ]
        ];

        for (const exp of experiences) {
            await pool.query('INSERT INTO timeline (year_range, title, subtitle, description, type, order_index) VALUES (?, ?, ?, ?, ?, ?)', exp);
        }

        // --- Timeline (Education) ---
        await pool.query('INSERT INTO timeline (year_range, title, subtitle, description, type, order_index) VALUES (?, ?, ?, ?, ?, ?)',
            ['2012 - 2015', 'Software Engineering (RPL)', 'SMK Komputer Abdi Bangsa', 'Focus on Software Development Life Cycle, Database Management, and Basic Programming.', 'education', 7]
        );

        // --- Projects ---
        const slugify = text => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const projects = [
            // Enterprise & Systems
            {
                category_id: idSystem,
                title: 'HRIS Integrated System (Web & Mobile)',
                desc: 'A comprehensive Human Resource Information System encompassing employee data management, camera-based attendance recording, leave & permit approval workflows, and digital document archiving. The mobile app allows real-time employee self-service.',
                tech: 'Laravel, Flutter, MySQL, REST API',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-hris.jpg'
            },
            {
                category_id: idSystem,
                title: 'KPI Monitoring System',
                desc: 'Automated performance evaluation system. Features real-time KPI target tracking, dynamic graphical visualizations, and a mobile-based approval workflow for performance grading.',
                tech: 'Laravel, MySQL, Flutter, Chart.js',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-kpi.jpg'
            },
            {
                category_id: idSystem,
                title: 'Cashflow & Targeting System',
                desc: 'Financial monitoring tool for branch operations. Tracks real-time cash flow, analyzes financial health against targets, and generates automated financial reports for management.',
                tech: 'Laravel, MySQL, Bootstrap',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-cashflow.jpg'
            },
            {
                category_id: idSystem,
                title: 'POS Multi-Company Enterprise',
                desc: 'Scalable Point of Sales system designed for multi-branch and multi-company architectures. Handles complex inventory, real-time transaction monitoring, and consolidated accounting dashboards.',
                tech: 'Node.js, PostgreSQL, Express.js',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-pos.jpg'
            },
            {
                category_id: idSystem,
                title: 'Warehouse System with Camera Evidence',
                desc: 'Inventory management system integrated with camera capture for transaction proof. Ensures stock accuracy and updates inventory levels in real-time.',
                tech: 'PHP, MySQL, Hardware Integration',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-warehouse.jpg'
            },

            // Government
            {
                category_id: idGov,
                title: 'Tripartite Agreement System (BPDLH)',
                desc: 'Digital document workflow system for BPDLH to manage tripartite agreements. Features include multi-party approval workflows, real-time signing status tracking, and secure digital archiving.',
                tech: 'Laravel, MySQL, Workflow Engine',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-agreement.jpg'
            },

            // Web & Tools
            {
                category_id: idWeb,
                title: 'Company Profile - Graha Simas Sejati',
                desc: 'Corporate website designed to showcase services and company portfolio with a professional and responsive layout.',
                tech: 'PHP, MySQL, HTML5, CSS3',
                media_type: 'web_link',
                media_url: 'http://www.simastel.com',
                thumb: '/uploads/projects/project-compro.jpg'
            },
            {
                category_id: idWeb,
                title: 'E-Commerce - BuatSeragam',
                desc: 'Custom e-commerce platform for uniform sales. Includes product grouping, cart management, order tracking, and payment gateway integration.',
                tech: 'PHP, MySQL, Bootstrap',
                media_type: 'web_link',
                media_url: 'http://www.buatseragam.co.id',
                thumb: '/uploads/projects/project-ecommerce.jpg'
            },
            {
                category_id: idWeb,
                title: 'Shortlink Generator & Analytics',
                desc: 'URL shortening service offering custom domains, detailed click analytics, and geolocation tracking.',
                tech: 'Node.js, PostgreSQL',
                media_type: 'web_link',
                media_url: '#',
                thumb: '/uploads/projects/project-shortlink.jpg'
            },

            // IoT / Hardware
            {
                category_id: idIot,
                title: 'Event Guestbook Scanner',
                desc: 'Digital guest registration utilizing QR Code scanning. Integrated with HPRT thermal printers for instant name badge printing upon check-in.',
                tech: 'Node.js, Hardware SDK',
                media_type: 'image',
                media_url: '#',
                thumb: '/uploads/projects/project-guestbook.jpg'
            }
        ];

        for (const proj of projects) {
            await pool.query(`
                INSERT INTO projects (category_id, title, slug, description, excerpt, tech_stack, media_type, media_url, thumbnail, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            `, [
                proj.category_id,
                proj.title,
                slugify(proj.title),
                proj.desc,
                proj.desc.substring(0, 120) + '...',
                proj.tech,
                proj.media_type,
                proj.media_url,
                proj.thumb
            ]);
        }

        // --- Skills ---
        const skills = [
            { t: 'Node.js', d: 'Runtime Environment', c: 'skill-icon-node', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
            { t: 'Laravel', d: 'PHP Framework', c: 'skill-icon-web', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
            { t: 'Flutter', d: 'Mobile Development', c: 'skill-icon-mobile', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>' },
            { t: 'MySQL', d: 'Relational Database', c: 'skill-icon-db', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>' },
            { t: 'PostgreSQL', d: 'Advanced Database', c: 'skill-icon-db', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>' },
            { t: 'Docker', d: 'Containerization', c: 'skill-icon-devops', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>' },
            { t: 'REST API', d: 'Backend Integration', c: 'skill-icon-api', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' },
            { t: 'Hardware Integration', d: 'IoT & Devices', c: 'skill-icon-ai', i: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>' }
        ];

        let sOrder = 1;
        for (const s of skills) {
            await pool.query('INSERT INTO skills (title, description, icon_svg, color_class, sort_order) VALUES (?, ?, ?, ?, ?)', [s.t, s.d, s.i, s.c, sOrder++]);
        }

        // --- Badges (Orbit) ---
        const badges = [
            { t: 'Node.js', c: 'badge-node' },
            { t: 'Laravel', c: 'badge-php' },
            { t: 'Flutter', c: 'badge-flutter' },
            { t: 'MySQL', c: 'badge-sql' },
            { t: 'Postgres', c: 'badge-docker' },
            { t: 'Full Stack', c: 'badge-server' }
        ];

        sOrder = 1;
        for (const b of badges) {
            await pool.query('INSERT INTO badges (text, css_class, sort_order) VALUES (?, ?, ?)', [b.t, b.c, sOrder++]);
        }

        // --- Stats ---
        // 8+ Years, 10+ Projects, 4 Companies, 3 Tech Stacks
        await pool.query('INSERT INTO stats (number, suffix, label, sort_order) VALUES (?, ?, ?, ?)', [8, '+', 'Years Experience', 1]);
        await pool.query('INSERT INTO stats (number, suffix, label, sort_order) VALUES (?, ?, ?, ?)', [10, '+', 'Large Scale Projects', 2]);
        await pool.query('INSERT INTO stats (number, suffix, label, sort_order) VALUES (?, ?, ?, ?)', [4, '', 'Companies Served', 3]);
        await pool.query('INSERT INTO stats (number, suffix, label, sort_order) VALUES (?, ?, ?, ?)', [3, '', 'Major Frameworks', 4]);

        console.log('✅ Seed Completed Successfully!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error Seeding Data:', err);
        process.exit(1);
    }
}

run();
