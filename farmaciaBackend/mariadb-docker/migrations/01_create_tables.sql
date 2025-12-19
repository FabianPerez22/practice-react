CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
);

CREATE TABLE medicament (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);