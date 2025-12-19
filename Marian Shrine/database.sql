-- Database Creation Script for Marian Shrine

CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
-- Username: admin
-- Password: password123 (Hash: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi)
-- User MUST change this after first login or via database
INSERT INTO admin (username, password) VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert default sample data
INSERT INTO gallery_images (title, date, url, description) VALUES 
('October 4 Ceremony', '2025-10-04', 'Images/graces.jpg', 'A beautiful ceremony.'),
('Sunday Masses', '2025-12-03', 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 'Community gathering for Sunday Mass.');

INSERT INTO videos (title, date, url, description) VALUES 
('Sunday Sermon: The Second school of Advent', '2025-12-07', 'https://www.facebook.com/embed/dQw4w9WgXcQ', 'Father shares wisdom on the Second School of Advent.');
