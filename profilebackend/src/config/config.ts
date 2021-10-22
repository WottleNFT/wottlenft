require('dotenv').config()

export const port = process.env.PORT || 3080
export const dbport = process.env.DBPORT || 5432
export const dbhost = process.env.DBHOST || "localhost"
export const dbpassword = process.env.DBPASSWORD || "999999a!"
export const dbuser = process.env.DBUSER || "postgres"
export const TOKEN_SECRET= process.env.TOKEN_SECRET || "secret"
export const TOKEN_EXPIRY_TIME = process.env.TOKEN_EXPIRY_TIME || "3h"
