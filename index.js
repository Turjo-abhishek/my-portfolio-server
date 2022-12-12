const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uhdrgdr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const projectsCollection = client.db("my-portfolio").collection("projects");

      app.get("/projects", async (req, res) => {
        const query = {};
        const result = await projectsCollection.find(query).toArray();
        res.send(result);
      });

      app.get("/projects/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await projectsCollection.findOne(query);
        res.send(result);
      });
  
      
    } finally {
    }
  }
  run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("my portfolio server is running");
});

app.listen(port, () => {
  console.log(`my portfolio server is running on port ${port}`);
});