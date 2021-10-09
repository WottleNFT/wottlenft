import {Pool, Client} from "pg"
import {databaseconnection} from "../config/config"
const pool = new Pool({
    connectionString: databaseconnection,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect();

export default pool