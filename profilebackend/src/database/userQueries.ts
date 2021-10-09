import {QueryResult} from "pg";
import { User } from "../models/user";
import pool from "./database";

export function insertUser(user: User): Promise<QueryResult> {
    return pool.query('INSERT INTO USER(password, email) VALUES ($1, $2)', 
        [user.password, user.email])
}