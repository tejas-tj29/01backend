import dbConnect from './db/db_connect.js'
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})
dbConnect();