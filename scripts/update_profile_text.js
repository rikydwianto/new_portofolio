const pool = require('../config/database');

async function run() {
    try {
        console.log('🔄 Updating Profile Text...');

        await pool.query(`
            UPDATE profile SET 
            about_title = ?,
            about_desc_1 = ?,
            about_desc_2 = ?
            WHERE id = (SELECT id FROM (SELECT id FROM profile LIMIT 1) AS t)
        `, [
            'Turning Ideas Into <br><span class="gradient-text">Digital Reality</span>',
            "An experienced developer who started his career with <strong>PHP</strong> and has continuously evolved into modern technologies like <strong>Node.js</strong>, <strong>Flutter</strong>, and <strong>Android Studio</strong>. I believe great code isn't just about functionality — it's about clean architecture, high performance, and outstanding user experience.",
            "Beyond application development, I'm proficient in <strong>server management</strong>, <strong>Docker containerization</strong>, and database administration with both <strong>MySQL</strong> and <strong>SQL Server</strong>. I also have a passion for <strong>data analysis</strong> and <strong>data mining</strong> — turning raw data into actionable insights. A relentless problem-solver and critical thinker who thrives on tackling complex challenges head-on."
        ]);

        console.log('✅ Profile Text Updated!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error updating profile:', err);
        process.exit(1);
    }
}

run();
