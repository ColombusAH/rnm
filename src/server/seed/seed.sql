-- -- Create tables for the Photographer Management SaaS
-- -- Tenant Table
-- CREATE TABLE tenants (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     contact_info VARCHAR(255)
-- );

-- -- Users Table
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     tenant_id INT NOT NULL,
--     username VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(100) NOT NULL,
--     FOREIGN KEY (tenant_id) REFERENCES tenants(id)
-- );


-- -- Clients Table
-- CREATE TABLE clients (
--     id SERIAL PRIMARY KEY,
--     tenant_id INT NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     contact_info VARCHAR(255),
--     user_id INT,
--     FOREIGN KEY (tenant_id) REFERENCES tenants(id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- -- Leads Table
-- CREATE TABLE leads (
--     id SERIAL PRIMARY KEY,
--     tenant_id INT NOT NULL,
--     contact_info VARCHAR(255) NOT NULL,
--     source VARCHAR(255),
--     status VARCHAR(100),
--     client_id INT,
--     FOREIGN KEY (tenant_id) REFERENCES tenants(id),
--     FOREIGN KEY (client_id) REFERENCES clients(id)
-- );

-- -- Events Table
-- CREATE TABLE events (
--     id SERIAL PRIMARY KEY,
--     tenant_id INT NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     date DATE NOT NULL,
--     client_id INT,
--     FOREIGN KEY (tenant_id) REFERENCES tenants(id),
--     FOREIGN KEY (client_id) REFERENCES clients(id)
-- );

-- -- Services Table
-- CREATE TABLE services (
--     id SERIAL PRIMARY KEY,
--     tenant_id INT NOT NULL,
--     description VARCHAR(255) NOT NULL,
--     cost DECIMAL(10, 2),
--     FOREIGN KEY (tenant_id) REFERENCES tenants(id)
-- );

-- -- Event Services Table (to manage services linked to events)
-- CREATE TABLE event_services (
--     event_id INT NOT NULL,
--     service_id INT NOT NULL,
--     PRIMARY KEY (event_id, service_id),
--     FOREIGN KEY (event_id) REFERENCES events(id),
--     FOREIGN KEY (service_id) REFERENCES services(id)
-- );

-- -- Notifications Table
-- CREATE TABLE notifications (
--     id SERIAL PRIMARY KEY,
--     tenant_id INT NOT NULL,
--     user_id INT NOT NULL,
--     message TEXT NOT NULL,
--     status VARCHAR(100) DEFAULT 'unread',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (tenant_id) REFERENCES tenants(id)
-- );

-- -- Assign photographers to events (assuming a separate photographers table exists)
-- CREATE TABLE photographers (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     contact_info VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE event_photographers (
--     event_id INT NOT NULL,
--     photographer_id INT NOT NULL,
--     PRIMARY KEY (event_id, photographer_id),
--     FOREIGN KEY (event_id) REFERENCES events(id),
--     FOREIGN KEY (photographer_id) REFERENCES photographers(id)
-- );


-- -- Insert sample tenants
-- INSERT INTO tenants (name, contact_info) VALUES
-- ('Photography Studio A','');

-- -- Insert sample users
-- INSERT INTO users (tenant_id, username, password, role) VALUES
-- (1, 'rick', '$2b$10$rkvMom7eiSdvwIBvkeUcgusU9wDBb71co/WwQpAEhM7.J0tknvWCS', 'admin'),
-- (1, 'john', '$2b$10$rkvMom7eiSdvwIBvkeUcgusU9wDBb71co/WwQpAEhM7.J0tknvWCS', 'user'),
-- (1, 'jane', '$2b$10$rkvMom7eiSdvwIBvkeUcgusU9wDBb71co/WwQpAEhM7.J0tknvWCS', 'user')
-- ON CONFLICT (username) DO NOTHING;

