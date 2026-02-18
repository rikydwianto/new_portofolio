CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(60) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(160) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    excerpt VARCHAR(255),
    thumbnail VARCHAR(255) NOT NULL,
    media_type ENUM('image', 'video', 'web_link', 'pdf') DEFAULT 'web_link',
    media_url VARCHAR(255),
    tech_stack VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS timeline (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year_range VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(100) NOT NULL,
    description TEXT,
    type ENUM('experience', 'education', 'certification') DEFAULT 'experience',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
