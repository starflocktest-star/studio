-- schema.sql

-- Users Table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('fan', 'influencer', 'admin') NOT NULL,
    profile_picture_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Influencers Table (Profile information for users with 'influencer' role)
CREATE TABLE influencers (
    user_id VARCHAR(255) PRIMARY KEY,
    category VARCHAR(255),
    bio TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Social Links Table
CREATE TABLE social_links (
    influencer_id VARCHAR(255) PRIMARY KEY,
    instagram_url VARCHAR(255),
    twitter_url VARCHAR(255),
    youtube_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    FOREIGN KEY (influencer_id) REFERENCES influencers(user_id)
);

-- Services Table
CREATE TABLE services (
    id VARCHAR(255) PRIMARY KEY,
    influencer_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL, -- Price in INR
    FOREIGN KEY (influencer_id) REFERENCES influencers(user_id)
);

-- Orders Table
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    influencer_id VARCHAR(255) NOT NULL,
    service_id VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Price in INR
    occasion VARCHAR(255),
    description TEXT,
    status ENUM('Pending', 'In Progress', 'Completed', 'Rejected') DEFAULT 'Pending',
    request_date DATE,
    video_url VARCHAR(255),
    attachment_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (influencer_id) REFERENCES influencers(user_id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Reviews Table
CREATE TABLE reviews (
    id VARCHAR(255) PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    influencer_id VARCHAR(255) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (influencer_id) REFERENCES influencers(user_id)
);

-- Support Tickets Table
CREATE TABLE support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category ENUM('Order Issue', 'Payment Issue', 'Account Issue', 'General Inquiry') NOT NULL,
    description TEXT NOT NULL,
    order_id VARCHAR(255),
    status ENUM('Open', 'In Progress', 'Closed') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
