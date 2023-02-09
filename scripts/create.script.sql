/* source Documents/project/shopping_cart_app/api/scripts/create.script.sql */

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS item_types;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(255),
  password VARCHAR(24),
  PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS item_types (
  item_type_id INT AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY(item_type_id)
);

CREATE TABLE IF NOT EXISTS items (
  item_id INT AUTO_INCREMENT,
  name VARCHAR(50),
  quantity INT,
  image_url VARCHAR(255),
  item_type_id INT,
  PRIMARY KEY (item_id),
  FOREIGN KEY(item_type_id) REFERENCES item_types(item_type_id)
);