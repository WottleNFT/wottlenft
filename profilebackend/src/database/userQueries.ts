import {QueryResult} from "pg";
import { User } from "../models/user";
import pool from "./database";

export async function insertUser(user: User): Promise<QueryResult> {
    return pool.query('INSERT INTO accounts(username, wallet_id, password, email) VALUES ($1, $2, $3, $4)', 
        [user.username, user.wallet_id, user.password, user.email])
}

export async function getUserByWalletID(wallet_id: string): Promise<User | null> {
    const data = await pool.query("SELECT * FROM accounts WHERE wallet_id = $1", [wallet_id]);
    if (data.rows.length == 0) {
        return null;
    } 
    return data.rows[0]
}

export async function getUserByUsername(username: string): Promise<User| null> {
    const data = await pool.query("SELECT * FROM accounts WHERE username = $1", [username]);
    if (data.rows.length == 0) {
        return null;
    } 
    data.rows[0].password = null
    return data.rows[0]
}