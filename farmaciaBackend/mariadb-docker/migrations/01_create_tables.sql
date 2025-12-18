CREATE TABLE medicament (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    id_medicament INT,
    CONSTRAINT fk_users_medicament
        FOREIGN KEY (id_medicament)
        REFERENCES medicament(id)
);
