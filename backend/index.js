const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express();
const Port = 3000;
const sqlite3 = require('sqlite3').verbose()
const multer = require('multer')

if (!fs.existsSync('database')){
    fs.mkdirSync('database');
}


let db = new sqlite3.Database('database/list_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
  
      db.run(`CREATE TABLE Items(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name           TEXT    NOT NULL,
              amount         INT     NOT NULL,
              path           TEXT    NOT NULL
            );`, (err) => { if (err) console.log()});
});

const ImageBasePath = "uploaded_images/"
const storage = multer.diskStorage({
  destination: ImageBasePath,
  filename: function (req, file, cb) {

    var fileObj = {
      "image/png": ".png",
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg"
    };
    if (fileObj[file.mimetype] === undefined) {
      cb(new Error("format not accepted, ONLY IMAGE FILES "));
    } else {
      cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
    }
  }
})
const upload = multer({ storage }).single("image")


app.use(cors());
app.use(express.static('static'));


app.use(express.static('uploaded_images'));

app.use('/api/add', express.json());
app.use('/api/remove', express.json());
app.use('/api/increase', express.json());
app.use('/api/decrease', express.json());


//Express
// POST

app.post('/api/add', upload, (req, res) => {
  const sql = "INSERT INTO Items (name, amount, path) VALUES (?, ?, ?);";
  const info = JSON.parse(req.body.info);
  const name = info.name;
  const amount = (info.amount === null) ? 0 : info.amount;

  const path = (req.file === undefined) 
    ? info.path 
    : req.protocol + '://' + req.headers.host + '/' + req.file.filename; 

  console.log("Name: " + name);
  console.log("Amount: " + amount);
  console.log("Path: " + path);
  if (name.length > 0) { 
    db.run(sql, [name, amount, path], function (err) { 
      if (err) {
        res.json({error: true, info: err});
      } else {

         console.log("Added item with id: " + this.lastID)
        res.json({error: false, id: this.lastID, path: path});
      }
    });
  }
  else {  
    res.json({error: true, info: new Error("Name fieldname should at least have one charachter").stack});
  }
});

app.post('/api/remove', (req, res) => {
  const id = req.body.id;  
  
  const getSql = "SELECT path FROM Items WHERE id = ?;";
  db.get(getSql, [id], function (err, row) { 
    if (err) {
      res.json({error: true, info: err});
    } else {
      console.log("Found item ", row);
      let imagePath = row.path;

      if (imagePath === undefined) {
        res.json({error: true, info: new Error("imagePath is undefined.")});
        return;
      }


      const removeSql = "DELETE FROM Items WHERE id = ?;";
      db.run(removeSql, [id], function (err) { 
        if (err) {
          res.json({error: true, info: err});
        } else {
          console.log("Removed item with id: " + this.lastID)

          if (req.body.defaultImage === false) {
            imagePath = ImageBasePath + imagePath.substr(imagePath.lastIndexOf('/'));
            try {
              fs.unlinkSync(imagePath);
            } catch (e) {
              console.log("Deleting image file resulted in err: ", e);
            }
          }
          res.json({error: false});
        }
      });
    }
  });
});

app.post('/api/increase', (req, res, next) => {
  const sql = "UPDATE Items SET amount = amount + 1 WHERE id = ?";
  const id = req.body.id;
  console.log("id: " + id);
  console.log("Increase");
  if (id === undefined) {
    throw new Error("Id is undefined, cant change quantity.");
  }
  db.run(sql, [id], err => { 
    if (err) {

      next(err);
    } else {
      res.end();
    }
  });
});

app.post('/api/decrease', (req, res, next) => {
  const sql = "UPDATE Items SET amount = amount - 1 WHERE id = ? AND amount > 0";
  const id = req.body.id;
  console.log("id: " + id);
  console.log("Decrease");
  if (id === undefined) {
    throw new Error("Id is undefined, cant change quantity.");
  }
  db.run(sql, [id], err => { 
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

// GET
app.get('/api/get-items', (req, res, next) => {
  const sql = "SELECT * FROM Items;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/\\d+$', (req, res) => {
  res.send(`Did a test GET for /api/${req.params.id}!`);
});


// listen

app.listen(Port, () => console.log(`Application running on port: ${Port}!`));