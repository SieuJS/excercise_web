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
  async getOneBy(filter, tb) {
    let c;
    let foundUser;
    try {
      c = await pgClient.connect();
      foundUser = await c.oneOrNone(
        `select * from $1:name where ($2:name) =  ($2:csv) LIMIT 1`,
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
