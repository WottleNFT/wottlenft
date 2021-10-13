require('dotenv').config()

export const port = process.env.PORT || 3080
export const databaseconnection = process.env.DATABAS_CONNECTION || 
"postgres://postgres:999999a!@localhost:5432/WottleProfileDB";
export const TOKEN_SECRET= process.env.TOKEN_SECRET || "secret"