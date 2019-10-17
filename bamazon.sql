DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price FLOAT NULL,
  stock_quantity INT NULL
);

CREATE TABLE departments (
  department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs FLOAT
);

ALTER TABLE products ADD product_sales INT;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Furbie', 'Toy', 25, 25),
    ('Basketball', 'Sporting Goods', 15, 50),
    ('Hair Dryer', 'Cosmetics', 40, 20),
    ('Dog Bone', 'Pet', 3, 100),
    ('Hammock', 'Sporting Goods', 80, 6),
    ('Television', 'Electronics', 200, 4),
    ('Makeup Remover', 'Cosmetics', 8, 40),
    ('Gameboy Color', 'Electronics', 1500, 1),
    ('X-Wing Lego Set', 'Toy', 100, 8),
    ('Cat Bed', 'Pet', 20, 6);