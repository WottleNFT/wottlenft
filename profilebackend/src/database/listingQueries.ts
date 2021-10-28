import { QueryResult } from "pg";
import { Listing, ListingStatus } from "../models/listing";
import pool from "./database";

export async function getAllListingsOfStatus(status: ListingStatus): Promise<Listing[]> {
  let data = await pool.query("SELECT * FROM listings WHERE current_status = $1", [status as string])
  return data.rows
}

export async function getListingByID(id: number): Promise<Listing | null> {
  let data = await pool.query("SELECT * FROM listings WHERE listing_id = $1", [id])
  return data.rows.length ==0 ? null : data.rows[0]
}
export async function getListingOfSeller(seller_wallet_id: string): Promise<Listing[]> {
  let data = await pool.query("SELECT * FROM listings WHERE seller_wallet_id = $1", [seller_wallet_id])
  return data.rows
}
export async function getListingOfBuyer(buyer_wallet_id: string): Promise<Listing[]> {
  let data = await pool.query("SELECT * FROM listings WHERE buyer_wallet_id = $1", [buyer_wallet_id])
  return data.rows
}
export async function addNewListing(listing: Listing): Promise<QueryResult> {
  return pool.query("INSERT INTO listings(nft_id, nft_asset_name, seller_wallet_id, price," 
    + "current_status, seller_contribution, un_goal) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [listing.nft_id, listing.nft_asset_name, listing.seller_wallet_id, listing.price, 
      listing.current_status, listing.seller_contribution, listing.un_goal])
}

export async function cancelListingOfId(id: number): Promise<QueryResult> {
  return pool.query("UPDATE listings SET current_status = $1 WHERE listing_id = $2", ["cancelled", id])
}
export async function completeListingOfId(id: number, buyer_wallet_id: string): Promise<QueryResult> {
  return pool.query("UPDATE listings SET buyer_wallet_id = $1, current_status = $2 WHERE listing_id = $3", 
  [buyer_wallet_id, "completed", id])
}
