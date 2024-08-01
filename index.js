const express= require('express')
const cors = require ('cors')
const app=express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors()); 
app.use(express.json());

//JobMaster 
//zdp7a3XTmNPdreKC

//password ache notes app a

const uri = "mongodb+srv://JobMaster:@cluster0.hehzvom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    const jobCollection = client.db("JobDB").collection('job');
    const job2Collection = client.db("JobDB").collection('job2');

    // read operation
    app.get('/addJob', async(req,res) =>{
        const cursor = jobCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    //read operation for job2 collection
    app.get('/addJob2', async(req,res) =>{
      const cursor = job2Collection.find()
      const result = await cursor.toArray()
      res.send(result)
  })

    //database to server ui specific id find

    app.get('/addJob/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await jobCollection.findOne(query)
      res.send(result)
    })

    //create operation
    app.post('/addJob', async(req,res) => {
        const newJob = req.body;
        console.log(newJob);
        const result = await jobCollection.insertOne(newJob);
        res.send(result);
    })

    //create operation for job2 collection
    app.post('/addJob2', async(req,res) => {
      const newJob = req.body;
      console.log(newJob);
      const result = await job2Collection.insertOne(newJob);
      res.send(result);
  })

     
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);


app.get('/',(req,res) =>{
    res.send('React-career-hub-server is running')
})
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})