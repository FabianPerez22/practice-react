CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    id_medicament INT,
);

CREATE TABLE medicament (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    userId INT,
    CONSTRAINT fk_user
        FOREIGN KEY (userId)
        REFERENCES users(id)
);