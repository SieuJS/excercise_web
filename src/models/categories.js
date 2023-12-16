const pgDB = require('./db.models')
const {client }= require('../database/connect');


const tableName = "Categories";

class Categories extends pgDB {
    async create (adder){
        const record = {
            ...adder
        }
        let pgCn ;
        try {
            pgCn = await client.connect();
            await pgCn.any(`INSERT INTO $1:name($2:name) VALUES ($2:csv)` , [tableName , record])
        }
        catch (err) {
            throw err;
        } 
        finally {
            pgCn.done();
        }
        return record;
    }
   static async getAll () {
    let pgCn ;
    let records ;
    try {
        pgCn = await client.connect();
        records = await pgCn.any("SELECT * FROM $1:name" , [tableName]);
    }
    catch (err) {
        console.log(err)
        throw err;
    }
    finally {
        pgCn.done();
    }
    return records;
   }
}
module.exports = Categories;