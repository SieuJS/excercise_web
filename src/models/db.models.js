const { client: pgClient } = require("../database/connect");

module.exports = class Db {
  constructor(tb) {
    this.tb = tb;
    let c;
    let existsTable;

    c = pgClient
      .connect()
      .then((c) => {
        return c.oneOrNone(
          `select exists (select *
                    from information_schema.tables
                    where table_name = ($1:csv)
                    and table_schema = 'public') as table_exists;`,
          [tb])
          .then((data ) => {
            if (!data.table_exists){
              throw new Error(`Can not find table ${tb}`)
            } 
          })
          return c;
      })//then (c)
      // .then(c => c.done())
      .catch(err => {throw err}) 

  }

  async Create(adder) {
    let c ;
    let proc
    try {
      c = await pgClient.connect();
      proc =  await client.connect();
      await pgConnect.any(`INSERT INTO $1:name($2:name) VALUES($2:csv)`, [ this.tb,adder]);
    }
    catch(err) {
      throw err;
    }
    finally{
      c.done();
    }
  }

  async getOneBy(filter) {
    let c;
    let foundUser;
    try {
      c = await pgClient.connect();
      foundUser = await c.oneOrNone(
        `select * from $1:name where ($2:name) =  ($2:csv)`,
        [this.tb, filter]
      );
    } catch (err) {
      throw err;
    } finally {
      c.done();
    }
    return foundUser;
  }

};
