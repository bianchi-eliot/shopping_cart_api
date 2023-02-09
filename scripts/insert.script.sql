/* source Documents/project/shopping_cart_app/api/scripts/insert.script.sql */

INSERT INTO users(user_id, firstname, lastname, email, password)
VALUES
  (DEFAULT, 'Scott', 'BYRD', 'scottbyrd@armyspy.com', 'ge2i$g9Ine'),
  (DEFAULT, 'Anna', 'DUBOIS', 'annadubois@rhyta.com', 'ia5ahY_woh'),
  (DEFAULT, 'Todd', 'Pollard', 'toddpollard@gmail.com', 'Ae[h4ieNooc');

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