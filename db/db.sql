CREATE TABLE "fridge" (
  _id SERIAL,
  fridge_unique_name VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (_id, fridge_unique_name)
);

CREATE TABLE "user-account" (
  _id SERIAL,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  default_fridge_name VARCHAR(30),
  PRIMARY KEY (_id),
  FOREIGN KEY (default_fridge_name) REFERENCES "fridge"(fridge_unique_name) ON UPDATE CASCADE
);

CREATE TABLE "fridge-join" (
  _id SERIAL,
  fridge_unique_name VARCHAR(30) NOT NULL,
  user_id INT NOT NULL,
  nickname VARCHAR(30),
  PRIMARY KEY (_id),
  FOREIGN KEY (user_id) REFERENCES "user-account"(_id) ON UPDATE CASCADE,
  FOREIGN KEY (fridge_unique_name) REFERENCES "fridge"(fridge_unique_name) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "food-items"(
  _id SERIAL,
  food_name VARCHAR(255) NOT NULL,
  quantity INT DEFAULT 1,
  unit VARCHAR(10),
  date_entered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiration_date TIMESTAMP,
  fridge_unique_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (_id),
  FOREIGN KEY (fridge_unique_name) REFERENCES "fridge" (fridge_unique_name) ON UPDATE CASCADE ON DELETE CASCADE
);

-- need to make a sessions table