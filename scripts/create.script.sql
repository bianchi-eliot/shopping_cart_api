/* source Documents/project/shopping_cart_app/api/scripts/create.script.sql */

DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS item_types;
DROP TABLE IF EXISTS carts; 
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users(
  user_id INT AUTO_INCREMENT,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(255),
  password VARCHAR(24),
  PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS carts(
  cart_id INT AUTO_INCREMENT,
  user_id INT UNIQUE,
  PRIMARY KEY(cart_id),
  FOREIGN KEY(user_id) 
    REFERENCES users(user_id) 
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_types(
  item_type_id INT AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY(item_type_id)
);

CREATE TABLE IF NOT EXISTS items(
  item_id INT AUTO_INCREMENT,
  name VARCHAR(50),
  quantity INT,
  image_url VARCHAR(255),
  item_type_id INT,
  PRIMARY KEY(item_id),
  FOREIGN KEY(item_type_id) 
    REFERENCES item_types(item_type_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart_items(
  cart_id INT,
  item_id INT,
  quantity INT,
  FOREIGN KEY(cart_id) 
    REFERENCES carts(cart_id)
    ON DELETE CASCADE,
  FOREIGN KEY(item_id) 
    REFERENCES items(item_id)
    ON DELETE CASCADE,
  PRIMARY KEY(cart_id, item_id)
);