CREATE TABLE "user-account" (
  _id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE "fridge" (
  _id SERIAL,
  fridge_unique_name VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (_id, fridge_unique_name)
);

CREATE TABLE "fridge-join" (
  _id SERIAL,
  fridge_unique_name VARCHAR(30) NOT NULL,
  user_id INT NOT NULL,
  "default" BOOLEAN,
  nickname VARCHAR(30),
  PRIMARY KEY (_id),
  FOREIGN KEY (user_id) REFERENCES "user-account"(_id) ON UPDATE CASCADE,
  FOREIGN KEY (fridge_unique_name) REFERENCES "fridge"(fridge_unique_name) ON UPDATE CASCADE
);

CREATE TABLE "food-items"(
  _id SERIAL,
  food_name VARCHAR(255) NOT NULL,
  quantity INT,
  unit VARCHAR(50),
  date_entered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiration_date TIMESTAMP,
  fridge_unique_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (_id),
  FOREIGN KEY (fridge_unique_name) REFERENCES "fridge" (fridge_unique_name) ON UPDATE CASCADE ON DELETE CASCADE
);