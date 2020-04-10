#!/usr/bin/env node
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs');

if (!fs.existsSync('database')){
    fs.mkdirSync('database');
}

let db = new sqlite3.Database('database/item_lister.db', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to DB');
      db.run(`CREATE TABLE Items(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name           TEXT    NOT NULL,
              amount         INT     NOT NULL,
              path           TEXT    NOT NULL
           );`, (err) => { if (err) console.log(err)});
});
