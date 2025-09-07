-- SQL schema for the StarConnect application
-- This schema is designed for a relational database like MySQL or PostgreSQL.

-- Users can be either fans or influencers.
-- The 'role' column distinguishes between them.
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- In a real app, store a hashed password, not plain text.
    role ENUM('fan', 'influencer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Influencers have profiles and specific details.
-- This table links to the 'users' table via a foreign key.
CREATE TABLE influencers (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    bio TEXT,
    image_url VARCHAR(255),
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    instagram_url VARCHAR(255),
    twitter_url VARCHAR(255),
    youtube_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Each influencer can offer multiple services with different prices.
CREATE TABLE services (
    id VARCHAR(255) PRIMARY KEY,
    influencer_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (influencer_id) REFERENCES influencers(id) ON DELETE CASCADE
);

-- Orders represent a fan's request for a service from an influencer.
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    fan_id VARCHAR(255) NOT NULL,
    influencer_id VARCHAR(255) NOT NULL,
    service_id VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    occasion VARCHAR(255),
    description TEXT,
    status ENUM('Pending', 'In Progress', 'Completed', 'Rejected') NOT NULL DEFAULT 'Pending',
    video_url VARCHAR(255),
    request_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fan_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (influencer_id) REFERENCES influencers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Reviews are left by fans for influencers after an order is completed.
CREATE TABLE reviews (
    id VARCHAR(255) PRIMARY KEY,
    fan_id VARCHAR(255) NOT NULL,
    influencer_id VARCHAR(255) NOT NULL,
    order_id VARCHAR(255) UNIQUE, -- A review is linked to a specific order.
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fan_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (influencer_id) REFERENCES influencers(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);
