-- Profile Data
INSERT INTO profile (name, hero_title, hero_desc, typewriter_text, about_title, about_desc_1, about_desc_2, email, phone, whatsapp_url, linkedin_url, github_url) 
VALUES (
    'Riky Dwianto', 
    'Hi, I''m <span class="gradient-text">Riky Dwianto</span>', 
    'Experienced developer specializing in high-performance web & mobile applications. From PHP roots to modern Node.js, Flutter, and cloud infrastructure — I craft solutions that scale and deliver real impact.',
    '["Web Applications.", "Mobile Apps with Flutter.", "Android Studio Projects.", "REST APIs with Node.js.", "PHP & Laravel Systems.", "Docker Containers.", "Server Infrastructure.", "SQL Server Databases.", "Data Analysis & Mining.", "AI-Powered Solutions.", "Clean & Scalable Code."]',
    'Turning Ideas Into<br><span class="gradient-text">Digital Reality</span>',
    'An experienced developer who started his career with <strong>PHP</strong> and has continuously evolved into modern technologies like <strong>Node.js</strong>, <strong>Flutter</strong>, and <strong>Android Studio</strong>. I believe great code isn''t just about functionality — it''s about clean architecture, high performance, and outstanding user experience.',
    'Beyond application development, I''m proficient in <strong>server management</strong>, <strong>Docker containerization</strong>, and database administration with both <strong>MySQL</strong> and <strong>SQL Server</strong>. I also have a passion for <strong>data analysis</strong> and <strong>data mining</strong> — turning raw data into actionable insights. A relentless problem-solver and critical thinker who thrives on tackling complex challenges head-on.',
    'rikydwianto016@gmail.com',
    '+62 812-1465-7370',
    'https://wa.me/6281214657370',
    'https://www.linkedin.com/in/riky-dwianto',
    'https://github.com/rikydwianto'
);

-- Stats Data
INSERT INTO stats (number, suffix, label, sort_order) VALUES
(5, '+', 'Years of Experience', 1),
(50, '+', 'Projects Completed', 2),
(30, '+', 'Happy Clients', 3),
(15, '+', 'Tech Stacks Mastered', 4);

-- Badges Data (Orbiting)
INSERT INTO badges (text, css_class, sort_order) VALUES
('PHP', 'badge-php', 1),
('Node.js', 'badge-node', 2),
('Flutter', 'badge-flutter', 3),
('Docker', 'badge-docker', 4),
('SQL Server', 'badge-sql', 5),
('DevOps', 'badge-server', 6);

-- Skills Data (Cards)
INSERT INTO skills (title, description, icon_svg, color_class, sort_order) VALUES
('Web Development', 'PHP, Laravel, Node.js, Express', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 'skill-icon-web', 1),
('Mobile Development', 'Flutter, Android Studio, Dart', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>', 'skill-icon-mobile', 2),
('Database Management', 'MySQL, SQL Server, MongoDB', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>', 'skill-icon-db', 3),
('DevOps & Infrastructure', 'Docker, Linux, Server Setup', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>', 'skill-icon-devops', 4),
('API & Backend', 'REST API, Microservices, Auth', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>', 'skill-icon-api', 5),
('Data Analytics & Mining', 'Data Analysis, Data Mining, BI', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>', 'skill-icon-data', 6),
('AI & Innovation', 'Machine Learning, NLP, Chatbot', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 0 1 10 10"></path><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>', 'skill-icon-ai', 7),
('Critical Thinking', 'Problem Solving, Analysis, Strategy', '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>', 'skill-icon-think', 8);
