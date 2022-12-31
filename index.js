require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p80omzu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const db = client.db("blogCmsa");
        const blogCollection = db.collection("blog");

        app.get("/blogs", async (req, res) => {
            const cursor = blogCollection.find({});
            const blog = await cursor.toArray();

            res.send({ status: true, data: blog });
        });

        app.post("/blog", async (req, res) => {
            const blog = req.body;

            const result = await blogCollection.insertOne(blog);

            res.send(result);
        });

        app.delete("/blog/:id", async (req, res) => {
            const id = req.params.id;

            const result = await blogCollection.deleteOne({ _id: ObjectId(id) });
            res.send(result);
        });
    } finally {
    }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Welcome to my Blog CMSA Server API World!");
});

app.listen(port, () => {
    console.log(`Blogs app listening on port ${port}`);
});

//------------
