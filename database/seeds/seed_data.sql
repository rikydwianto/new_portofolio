-- Admin User (password: admin123)
-- Hash: $2a$10$ bcrypt hash for 'admin123'
INSERT INTO users (username, password_hash, full_name) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Riky Dwianto');

-- Default Categories
INSERT INTO categories (name, slug) VALUES 
('Web Development', 'web-development'),
('Mobile Apps', 'mobile-apps'),
('AI Projects', 'ai-projects'),
('UI/UX Design', 'ui-ux-design');

-- Sample Timeline
INSERT INTO timeline (year_range, title, subtitle, description, type, order_index) VALUES 
('2023 - Present', 'Senior Full Stack Developer', 'Tech Innovation Corp.', 'Leading development of enterprise web applications using Node.js, React, and cloud services. Managing a team of 5 developers.', 'experience', 1),
('2021 - 2023', 'Full Stack Developer', 'Digital Agency Co.', 'Built 20+ client websites and web applications. Specialized in Express.js, MySQL, and responsive design.', 'experience', 2),
('2019 - 2021', 'Junior Web Developer', 'Startup Hub', 'Developed frontend interfaces and REST APIs. Learned mobile development with React Native.', 'experience', 3),
('2015 - 2019', 'S.Kom - Computer Science', 'Universitas Teknologi', 'Graduated with honors. Focus on Software Engineering and Artificial Intelligence.', 'education', 4),
('2023', 'AWS Certified Developer', 'Amazon Web Services', 'Associate level certification for cloud development.', 'certification', 5);

-- Sample Projects
INSERT INTO projects (category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack) VALUES 
(1, 'E-Commerce Platform', 'e-commerce-platform', 'A full-featured e-commerce platform with user authentication, product management, shopping cart, payment integration with Midtrans, and order tracking. Built with modern architecture and responsive design.', 'Full-stack e-commerce with payment integration', '/uploads/projects/placeholder-1.jpg', 'web_link', 'https://example.com', 'Node.js, Express, MySQL, EJS, Midtrans'),
(1, 'Point of Sale System', 'point-of-sale-system', 'Complete POS system for retail businesses. Features include inventory management, sales reporting, multi-user roles, receipt printing, and real-time dashboard analytics.', 'Modern POS system for retail businesses', '/uploads/projects/placeholder-2.jpg', 'web_link', 'https://example.com', 'Node.js, Express, MySQL, Chart.js'),
(2, 'Health Tracker App', 'health-tracker-app', 'Mobile application for tracking daily health metrics including steps, calories, water intake, and sleep patterns. Includes data visualization and weekly reports.', 'Mobile health tracking with analytics', '/uploads/projects/placeholder-3.jpg', 'image', '', 'React Native, Firebase, Redux'),
(3, 'Chatbot AI Assistant', 'chatbot-ai-assistant', 'An intelligent chatbot powered by natural language processing. Can handle customer service inquiries, provide product recommendations, and learn from conversations.', 'AI-powered customer service chatbot', '/uploads/projects/placeholder-4.jpg', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Python, TensorFlow, Flask, NLP'),
(4, 'Brand Identity Redesign', 'brand-identity-redesign', 'Complete brand identity redesign for a fintech startup. Includes logo design, color palette, typography system, and comprehensive brand guidelines document.', 'Complete brand identity for fintech startup', '/uploads/projects/placeholder-5.jpg', 'pdf', '/uploads/projects/brand-guide.pdf', 'Figma, Illustrator, Photoshop'),
(1, 'Learning Management System', 'learning-management-system', 'Online learning platform with video courses, quizzes, progress tracking, certificates, and instructor dashboard. Supports multiple content types and interactive lessons.', 'Online learning platform with video courses', '/uploads/projects/placeholder-6.jpg', 'web_link', 'https://example.com', 'Node.js, Express, MongoDB, Socket.io');

-- Sample Project Images (multiple per project)
INSERT INTO project_images (project_id, image_url, is_thumbnail, sort_order) VALUES 
(1, '/uploads/projects/placeholder-1.jpg', 1, 1),
(1, '/uploads/projects/placeholder-1b.jpg', 0, 2),
(1, '/uploads/projects/placeholder-1c.jpg', 0, 3),
(2, '/uploads/projects/placeholder-2.jpg', 1, 1),
(2, '/uploads/projects/placeholder-2b.jpg', 0, 2),
(3, '/uploads/projects/placeholder-3.jpg', 1, 1),
(3, '/uploads/projects/placeholder-3b.jpg', 0, 2),
(3, '/uploads/projects/placeholder-3c.jpg', 0, 3),
(4, '/uploads/projects/placeholder-4.jpg', 1, 1),
(5, '/uploads/projects/placeholder-5.jpg', 1, 1),
(6, '/uploads/projects/placeholder-6.jpg', 1, 1),
(6, '/uploads/projects/placeholder-6b.jpg', 0, 2);
