CREATE TABLE IF NOT EXISTS visitor_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    city VARCHAR(100) DEFAULT NULL,
    region VARCHAR(100) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    isp VARCHAR(150) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    page_visited VARCHAR(255) NOT NULL,
    project_slug VARCHAR(160) DEFAULT NULL,
    referrer VARCHAR(255) DEFAULT NULL,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ip (ip_address),
    INDEX idx_page (page_visited),
    INDEX idx_visited (visited_at)
);
