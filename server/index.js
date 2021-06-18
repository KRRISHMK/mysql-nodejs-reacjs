const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");




const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));



const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Password1@",
  database: "krrish",
});

app.post("/catdata", (req, res) => {
  const name = req.body.name;
  const position = req.body.position;
  const qualification= req.body.qualification;
  const age = req.body.age;


    db.query(
      "INSERT INTO data (name, position, qualification, age) VALUES (?,?,?,?)",
      [name, position, qualification, age],
      function (err, insert)   {
        if(err) {
          console.log(err);
        }
        
        res.send({ signed: true });
        console.log("Data uploaded");
      }
    );
  });
app.get("/getdata", (req,res) => {
  db.query("SELECT * FROM data", function (err, result) {
    if (err) throw err;
    console.log(result);
     res.send(result);
     
     
  });
});


app.listen(3001, () => {
  console.log("running server");
});