/* source Documents/project/shopping_cart_app/api/scripts/create.script.sql */

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS item_types;


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