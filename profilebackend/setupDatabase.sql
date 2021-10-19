DROP DATABASE IF EXISTS wottleprofiledb;
CREATE DATABASE wottleprofiledb;
\c wottleprofiledb;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts(
  account_id SERIAL PRIMARY KEY,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  UNIQUE(email)
);