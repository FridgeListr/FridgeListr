--
-- PostgreSQL database dump
--

-- INSTRUCTIONS TO RUN:
-- IN YOUR TERMINAL RUN: 
-- psql -d <url from elephantSQL> -f create-db.sql
-- * pay attention to routing of file. If you dropped this file within a folder and not the root folder of your project, you need to add
-- proper routing for this to work!

-- Alternatively, you can go to your elephantSQL empty database, copy + paste the code below and run!


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.fridge (
  _id SERIAL,
  fridge_unique_name VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (_id, fridge_unique_name)
) WITH (
  OIDS=FALSE
);

CREATE TABLE public."user-account" (
  _id SERIAL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  default_fridge_name VARCHAR(100),
  PRIMARY KEY (_id)
)WITH (
  OIDS=FALSE
);

ALTER TABLE public."user-account" ADD CONSTRAINT "user_fk0" FOREIGN KEY (default_fridge_name) REFERENCES public.fridge (fridge_unique_name) ON UPDATE CASCADE ON DELETE SET NULL;


CREATE TABLE public."fridge-join" (
  _id SERIAL,
  fridge_unique_name VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  nickname VARCHAR(100),
  PRIMARY KEY (_id)
  )WITH (
  OIDS=FALSE
);

ALTER TABLE public."fridge-join" ADD CONSTRAINT "fridge_fk0" FOREIGN KEY (fridge_unique_name) REFERENCES public.fridge (fridge_unique_name) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public."fridge-join" ADD CONSTRAINT "fridge_fk1" FOREIGN KEY (user_id) REFERENCES public."user-account" (_id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE public."food-item"(
  _id SERIAL,
  food_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit VARCHAR(20),
  date_entered DATE NOT NULL DEFAULT CURRENT_DATE,
  expiration_date DATE NOT NULL,
  fridge_unique_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (_id)
)WITH (
  OIDS=FALSE
);

ALTER TABLE public."food-item" ADD CONSTRAINT "food_fk0" FOREIGN KEY (fridge_unique_name) REFERENCES public.fridge (fridge_unique_name) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public."food-item" ALTER COLUMN expiration_date SET DEFAULT current_date + '7 days'::interval;


-- need to make a sessions table
CREATE TABLE public."sessions"(
  _id SERIAL,
  session_number VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  time_start DATE NOT NULL DEFAULT CURRENT_DATE,
  time_expire DATE NOT NULL,
  PRIMARY KEY (_id)
)WITH (
  OIDS=FALSE
);

ALTER TABLE public."sessions" ADD CONSTRAINT "session_fk0" FOREIGN KEY (user_id) REFERENCES public."user-account" (_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public."sessions" ALTER COLUMN time_expire SET DEFAULT current_date + '1 day'::interval;


-- TOC entry 3 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: fridges; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public.fridge (fridge_unique_name) VALUES 
  ('parent&apos;s fridge'),
  ('olaf'),
  ('My fridge');

-- TOC entry 6 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: species; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public."user-account" (_id, username, password, email, default_fridge_name) VALUES 
  (1, 'codeDenma', 'henryisawesome', 'codedenma@gmail.com', 'parent&apos;s fridge'),
  (2, 'frozenStove', 'lennyisawesome', 'frozenstove@gmail.com', 'parent&apos;s fridge'),
  (3, 'frozengurl', 'elsa', 'frozengirl7@gmail.com', 'olaf'),
  (4, 'sven', 'reindeersAreBetterThanPeople', 'svenTheReindeer@gmail.com', 'olaf'),
  (5, 'thebestanna', 'arendelle', 'sistersrule@gmail.com', NULL),
  (6, 'theyeticrab', 'carlosisawesome', 'cv@gmail.com', 'My fridge');
 
-- TOC entry 7 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: species; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public."fridge-join" (fridge_unique_name, user_id, nickname) VALUES 
  ('parent&apos;s fridge', 1, 'parent&apos;s fridge'),
  ('parent&apos;s fridge', 2, 'Henry&apos;s parent&apos;s fridge'),
  ('olaf', 3, 'olaf'),
  ('olaf', 4, 'carrot'),
  ('olaf', 5, 'friend'),
  ('My fridge', 6, 'My fridge'),
  ('parent&apos;s fridge', 6, 'Henry&apos;s fridge');

-- TOC entry 7 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: species; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public."food-item" (food_name, quantity, unit, fridge_unique_name) VALUES 
  ('apple', 3, NULL,'parent&apos;s fridge'),
  ('burger', 1, NULL,'parent&apos;s fridge'),
  ('smoothie', 2, 'cups', 'parent&apos;s fridge'),
  ('kale', 3, 'bunches', 'parent&apos;s fridge'),
  ('smoothie', 2, 'cups', 'parent&apos;s fridge'),
  ('salt', 5, 'teaspoons', 'parent&apos;s fridge'),
  ('carrot', 6, 'sticks', 'olaf'),
  ('ramen', 5, 'packs', 'olaf'),
  ('potatoes', 10, 'oz', 'olaf'),
  ('potato chips', 3, 'bags', 'olaf'),
  ('wontons', 2, 'bags', 'olaf'),
  ('chili peppers', 2, 'ounces', 'olaf'),
  ('yogurt', 3, 'cups', 'olaf'),
  ('chia seeds', 2, 'tbsp', 'My fridge'),
  ('pumpkin', 1, NULL, 'My fridge'),
  ('bread', 2, 'slices', 'My fridge');

-- TOC entry 7 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: species; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public."sessions" (session_number, user_id) VALUES 
  ('idunnowhatacookieshouldlooklikesoherehaveacookie', 1),
  ('whowantsacookiecookiemonsterswantsacookie', 2),
  ('onemoreforgoodluckandbecausegoodthingscomeinthrees', 3);


-- ! DROP ALL TABLES Command to reset and reinitialize.
-- Uncomment the lines below and paste into your SQL query runner of choice.
-- Comment them back when you are ready to populate the sample database. 

-- DROP TABLE "sessions";
-- DROP TABLE "food-item";
-- DROP TABLE "fridge-join";
-- DROP TABLE "user-account";
-- DROP TABLE "fridge";
