const { Pool } = require('pg');

const PG_URI = 'postgres://uvdtzgfr:g5f7EI12gfvnioLRqLkTqdho_QO3_sB2@heffalump.db.elephantsql.com/uvdtzgfr'

// postgres://uvdtzgfr:g5f7EI12gfvnioLRqLkTqdho_QO3_sB2@heffalump.db.elephantsql.com/uvdtzgfr

const pool = new Pool(
  connectionString:
);

// Entity-Relationships diagram can be found below: 
// https://github.com/Yeti-Crab-52/scratch-project/blob/dev/ER-table.png

// We export an object that contiains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to the access point to the database. 
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}