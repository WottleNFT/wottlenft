import { Listing, ListingStatus } from "../models/listing";
import pool from "./database";

export async function getAllListingsOfStatus(status: ListingStatus): Promise<Listing[]> {
  let data = await pool.query("SELECT * FROM listings WHERE current_status = $1", [status as string])
  return data.rows
}