const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const app = express()
const port = process.env.PORT || 5000;
require("dotenv").config();


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8tifwil.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const projectsCollection = client.db("Resume_of_masud").collection("projects");
        const technologiesCollection = client.db("Resume_of_masud").collection("technologies");
        

        app.get('/projects', async(req,res)=>{
            const query = {}
            const projects = await projectsCollection.find(query).toArray()
            res.send(projects)
        })
        app.get('/projects/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const projects = await projectsCollection.find(query).toArray()
            res.send(projects)
        })
        app.get('/technologies', async(req,res)=>{
            const query = {}
            const projects = await technologiesCollection.find(query).toArray()
            res.send(projects)
        })

    }
    finally{

    }
}

run().catch((error) => {
    console.log(error.message);
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})