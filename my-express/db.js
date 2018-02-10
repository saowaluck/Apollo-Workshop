const path = require('path')

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite'),
    },
    useNullAsDefault : true
  })

  module.exports = knex
