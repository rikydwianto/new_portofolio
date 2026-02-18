-- Table: profile (Singleton - only 1 row)
CREATE TABLE IF NOT EXISTS profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) DEFAULT 'Riky Dwianto',
    hero_title VARCHAR(255) DEFAULT 'Hi, I''m <span class="gradient-text">Riky Dwianto</span>',
    hero_desc TEXT,
    typewriter_text TEXT, -- JSON Array or Newline separated
    about_title VARCHAR(255) DEFAULT 'Turning Ideas Into <br><span class="gradient-text">Digital Reality</span>',
    about_desc_1 TEXT,
    about_desc_2 TEXT,
    email VARCHAR(100),
    phone VARCHAR(50),
    whatsapp_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    cv_link VARCHAR(255),
    available_for_work BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: stats (The counters like Years Exp, Projects)
CREATE TABLE IF NOT EXISTS stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    number INT DEFAULT 0,
    suffix VARCHAR(10) DEFAULT '+',
    label VARCHAR(100),
    sort_order INT DEFAULT 0
);

-- Table: skills (The 8 grid cards: Web, Mobile, AI, etc.)
CREATE TABLE IF NOT EXISTS skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    description VARCHAR(255),
    icon_svg TEXT, -- We store the SVG path or full SVG string
    color_class VARCHAR(50) DEFAULT 'skill-icon-web', -- css class for color
    sort_order INT DEFAULT 0
);

-- Table: badges (The 6 orbiting badges)
CREATE TABLE IF NOT EXISTS badges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(50), -- e.g. PHP, Node.js
    css_class VARCHAR(50), -- badge-php, badge-node (for positioning)
    sort_order INT DEFAULT 0
);
