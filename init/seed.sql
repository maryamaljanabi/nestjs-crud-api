CREATE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price FLOAT(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(product_id)
);

INSERT INTO products (name, price) VALUES ('Red Pen', 2.23);
INSERT INTO products (name, price) VALUES ('Painting Brush', 10.9);
INSERT INTO products (name, price) VALUES ('Eraser', 1.23);
INSERT INTO products (name, price) VALUES ('Notebook', 5.50);