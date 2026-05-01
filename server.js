const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;

// ✅ Use environment variable for Mongo URL (defaults to localhost for manual runs)
const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:vishal@localhost:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const client = new MongoClient(MONGO_URL);

let db; // ✅ global DB reference

// ✅ Connect ONCE when server starts
async function startServer() {
    try {
        await client.connect();
        console.log("✅ MongoDB Connected");

        db = client.db("vns-db");

        // ✅ GET all users
        app.get("/getUsers", async (req, res) => {
            try {
                const data = await db.collection("users").find({}).toArray();
                res.send(data);
            } catch (err) {
                console.error(err);
                res.status(500).send("Error fetching users");
            }
        });

        // ✅ POST new user
        app.post("/addUser", async (req, res) => {
            try {
                const userObj = req.body;
                await db.collection("users").insertOne(userObj);

                // send response OR redirect
                res.send("User added successfully ✅");
                // OR: res.redirect("/");
            } catch (err) {
                console.error(err);
                res.status(500).send("Error inserting user");
            }
        });

        // ✅ Start server AFTER DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
    }
}

// start app
startServer();