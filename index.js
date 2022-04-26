const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json())

// Mongodb Database
const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.froj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('sanny-dental-care').collection('service')
        app.get('/services', async (req, res) => {
            const query = req.query;
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)

        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);

            res.send(service)
        })
    }
    finally {

    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send("Running dental care")
})



app.listen(port, () => {
    console.log(` listening on port ${port}`)
})