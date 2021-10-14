import {QueryResult} from "pg";
import { User } from "../models/user";
import pool from "./database";

export async function insertUser(user: User): Promise<QueryResult> {
    return pool.query('INSERT INTO accounts(password, email) VALUES ($1, $2)', 
        [user.password, user.email])
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const data = await pool.query("SELECT * FROM accounts WHERE email = $1", [email]);
    if (data.rows.length == 0) {
        return null;
    } 
    return data.rows[0]
}

export async function getUserById(id: number): Promise<User| null> {
    const data = await pool.query("SELECT * FROM accounts WHERE account_id = $1", [id]);
    if (data.rows.length == 0) {
        return null;
    } 
    data.rows[0].password = null
    return data.rows[0]
}