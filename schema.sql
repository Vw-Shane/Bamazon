-- Delete this \/
DROP DATABASE IF EXISTS bamazon;

/* Create database */
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price  FLOAT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);
