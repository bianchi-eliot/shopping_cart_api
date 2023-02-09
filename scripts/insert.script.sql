/* source Documents/project/shopping_cart_app/api/scripts/insert.script.sql */

INSERT INTO item_types(item_type_id, name)
VALUES 
  (DEFAULT, 'Electronic'),
  (DEFAULT, 'Furniture'),
  (DEFAULT, 'Tools');

INSERT INTO items(item_id, name, quantity, image_url, item_type_id)
VALUES
  (DEFAULT, 'Computer', 5, 'computer.jpg', 1),
  (DEFAULT, 'TV', 23, 'television.jpg', 1),
  (DEFAULT, 'Chair', 12, 'chair.jpg', 2),
  (DEFAULT, 'Table', 19, 'table.jpg', 2),
  (DEFAULT, 'Screw', 98, 'screw.jpg', 3),
  (DEFAULT, 'Screwdriver', 9, 'screwdriver.jpg', 3);