// import sqlite3  from "sqlite3";
// const db = new sqlite3.Database("./db.sqlite3",(error) => {
//     if(error){
//         console.log("an error occured while connecting to db")
//     }
//     else{
//         console.log("db was successfully connected")
//     }
// })
// db.run(`
//     CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT , title TEXT NOT NULL, content TEXT NOT NULL)
//     `)
// export default db
import { createClient } from "@supabase/supabase-js";
const db = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_ANON_KEY)
export default db 