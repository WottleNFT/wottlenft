DROP DATABASE IF EXISTS wottleprofiledb;
CREATE DATABASE wottleprofiledb;
\c wottleprofiledb;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts(
  username VARCHAR PRIMARY KEY,
  wallet_id VARCHAR,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  bio TEXT,
  profile_picture_hash VARCHAR,
  UNIQUE(wallet_id)
);