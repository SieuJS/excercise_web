require('dotenv').config()
const pgp = require('pg-promise')({
    capSQL : true
})


const cn = {
    host : process.env.DB_HOST,
    port : process.env.DP_PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    max : 30
}


const db = pgp(cn);
exports.client = db;
exports.checkConnection = async ()=> {
    let c;
    try{
        c = await db.connect();
        c.done();

        console.log("Connect to db success")
    }
    catch (err) {
        throw err;
    }
}

