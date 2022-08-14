--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.5

-- Started on 2019-09-11 16:56:10 PDT

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

CREATE TABLE public.fridges (
  _id SERIAL,
  fridge_unique_name VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (_id, fridge_unique_name)
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user_accounts (
  _id SERIAL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  default_fridge_name VARCHAR(100),
  PRIMARY KEY (_id),
  FOREIGN KEY (default_fridge_name) REFERENCES fridges (fridge_unique_name) ON UPDATE CASCADE
)WITH (
  OIDS=FALSE
);


CREATE TABLE public.fridges_join (
  _id SERIAL,
  fridge_unique_name VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  nickname VARCHAR(100),
  PRIMARY KEY (_id),
  FOREIGN KEY (user_id) REFERENCES user_accounts (_id) ON UPDATE CASCADE,
  FOREIGN KEY (fridge_unique_name) REFERENCES fridges (fridge_unique_name) ON UPDATE CASCADE ON DELETE CASCADE
)WITH (
  OIDS=FALSE
);

CREATE TABLE public.food_items(
  _id SERIAL,
  food_name VARCHAR(100) NOT NULL,
  quantity INT DEFAULT 1,
  unit VARCHAR(20),
  date_entered DATE NOT NULL DEFAULT CURRENT_DATE,
  expiration_date DATE,
  fridge_unique_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (_id),
  FOREIGN KEY (fridge_unique_name) REFERENCES fridges (fridge_unique_name) ON UPDATE CASCADE ON DELETE CASCADE
)WITH (
  OIDS=FALSE
);

ALTER TABLE public.food_items ALTER COLUMN expiration_date SET DEFAULT current_date + '7 days'::interval;



-- need to make a sessions table
CREATE TABLE public.sessions(
  _id SERIAL,
  session_number VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  time_start DATE NOT NULL DEFAULT CURRENT_DATE,
  time_expire DATE NOT NULL,
  PRIMARY KEY (_id),
  FOREIGN KEY (user_id) REFERENCES user_accounts (_id) ON UPDATE CASCADE ON DELETE CASCADE
)WITH (
  OIDS=FALSE
);

ALTER TABLE public.sessions ALTER COLUMN time_expire SET DEFAULT current_date + '1 day'::interval;


-- TOC entry 3 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: fridges; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public.fridges (fridge_unique_name) VALUES 
  ('parent&apos;s fridge'),
  ('olaf'),
  ('My fridge');

-- TOC entry 6 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: species; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public.user_accounts (_id, username, password, email, default_fridge_name) VALUES 
  (1, 'codeDenma', 'henryisawesome', 'codedenma@gmail.com', 'parent&apos;s fridge'),
  (2, 'frozenStove', 'lennyisawesome', 'frozenstove@gmail.com', 'parent&apos;s fridge'),
  (3, 'frozengurl', 'elsa', 'frozengirl7@gmail.com', 'olaf'),
  (4, 'sven', 'reindeersAreBetterThanPeople', 'svenTheReindeer@gmail.com', 'olaf'),
  (5, 'thebestanna', 'arendelle', 'sistersrule@gmail.com', NULL),
  (6, 'theyeticrab', 'carlosisawesome', 'cv@gmail.com', 'My fridge');
 
-- TOC entry 7 (class 0 OID  )
-- Dependencies: ;
-- Data for Name: species; Type: TABLE DATA; Schema:  Owner: -
INSERT INTO public.fridges_join (fridge_unique_name, user_id, nickname) VALUES 
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
INSERT INTO public.food_items (food_name, quantity, unit, fridge_unique_name) VALUES 
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
INSERT INTO public.sessions (session_number, user_id) VALUES 
  ('idunnowhatacookieshouldlooklikesoherehaveacookie', 1),
  ('whowantsacookiecookiemonsterswantsacookie', 2),
  ('onemoreforgoodluckandbecausegoodthingscomeinthrees', 3);
