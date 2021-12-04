import {Pool} from "pg"
import * as config from "../config/config"
const pool = new Pool({
    user: config.dbuser,
    host: config.dbhost,
    database: 'wottleprofiledb',
    password: config.dbpassword,
    port: config.dbport as number,
});
pool.connect();
initialiseDatabase();
async function  initialiseDatabase() {
  if (!config.resetDB) {
    return;
  }
  try{
  let result = await pool.query(`
  DROP TABLE IF EXISTS listings;
  DROP TYPE IF EXISTS listing_status;
  DROP TABLE IF EXISTS accounts;
  CREATE TABLE accounts(
    username VARCHAR PRIMARY KEY,
    wallet_id VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    bio TEXT,
    profile_picture_hash VARCHAR,
    profile_banner_hash VARCHAR,
    UNIQUE(wallet_id)
  );
  CREATE TYPE listing_status AS ENUM('completed', 'cancelled', 'listing');
  CREATE TABLE listings(
    listing_id SERIAL PRIMARY KEY,
    nft_id VARCHAR NOT NULL,
    nft_asset_name VARCHAR NOT NULL,
    nft_metadata TEXT,
    buyer_wallet_id VARCHAR REFERENCES accounts(wallet_id),
    seller_wallet_id VARCHAR NOT NULL REFERENCES accounts(wallet_id),
    price DOUBLE PRECISION NOT NULL,
    current_status listing_status NOT NULL,
    seller_contribution DOUBLE PRECISION,
    buyer_contribution DOUBLE PRECISION,
    creation_time TIMESTAMP,
    buy_or_cancel_time TIMESTAMP,
  );`)
  } catch (error: any) {
    console.log("Failed to initailise DB");
    console.log(error)
  }
}


export default pool