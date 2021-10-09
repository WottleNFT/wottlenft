DROP DATABASE IF EXISTS WottleProfileDB;
CREATE DATABASE WottleProfileDB;
\c WottleProfileDB;
DROP TABLE IF EXISTS User;

CREATE TABLE User(
    user_id SERIAL PRIMARY KEY,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    UNIQUE(email)
);