CREATE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price FLOAT(10,2) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(product_id)
);

INSERT INTO products (name, price, description) VALUES ('Red Pen', 2.23, 'lorem ipsum dolor sit amet');
INSERT INTO products (name, price, description) VALUES ('Painting Brush', 10.9, 'some high quality painting brush');
INSERT INTO products (name, price, description) VALUES ('Eraser', 1.23, 'lorem ipsum dolor sit amet erat, sed diam nonum nonummy ut labore et dolore magna aliquet'); 
INSERT INTO products (name, price, description) VALUES ('Notebook', 5.50, 'a popular notebook among art students');