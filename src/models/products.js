const pgDB =require('./db.models')
const  {client} = require('../database/connect');

const tableName = "Products";

class Products extends pgDB {
    static async getNProducts  (number) {
        let pgCn;
        let records ;
        try {
            pgCn = await client.connect();
            records = await pgCn.any("SELECT * FROM $1:name LIMIT $2" ,[tableName, number])
        }    
        catch (err) {
            throw err
        }
        finally {
            pgCn.done();
        }
        return records;
    }
}

module.exports = Products;