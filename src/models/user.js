const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
const {client} = require('../database/connect');
const pgDB = require('./db.models');

const tableName = "Users"
class User extends pgDB {
    async create(adder) {
        // Password hashing; 
        const salt = crypto.randomBytes(8).toString('hex');
        const hashedBuf = await scrypt(adder.Password,salt, 64);
        //Adding pasword 
        const record = {
            ...adder,
            Password : `${hashedBuf.toString('hex')}.${salt}`,
            Permission : 1
        };

        //Inserting 
        let pgConnect ;
        try {
            console.log(adder);
            pgConnect = await client.connect();
            await pgConnect.any(`INSERT INTO $1:name($2:name) VALUES($2:csv)`, [ tableName,record]);
        }
        catch(err) {
            console.log(err.message)
            throw err;
        }
        finally{
            pgConnect.done();
        }
        return adder;
    }

    async comparePassword (encrp, raw){
        const [hashed, salt] = encrp.split('.');
        const hashedBuf = await scrypt(raw, salt, 64);
        return (hashedBuf.toString('hex') === hashed);
    }
}

module.exports = new User(tableName);