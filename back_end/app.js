const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const order = require('./controllers/order');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://localhost:27017";
app.post('/api/signin', signin.handleSignin(url, bcrypt))
app.post('/api/register', (req, res) => { register.handleRegister(req, res, url, bcrypt) })
app.post('/api/order', (req, res) => { order.placeOrder(req, res, url) })
app.get('/api/order/:user_id', (req, res) => {order.getOrder(req, res, url)})
app.get("/api/products", (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("shoppingWeb");
        dbo.collection("product").find({}).toArray((error, result) => {
            if (error) {
                res.send("Error", error);
                return;
            }
            res.send(JSON.stringify(result));
            db.close();
        });
    });
});
    
app.post('/api/students', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;

    console.log(first_name, last_name, age);
    const myObj = { first_name: first_name, last_name: last_name, age: age };

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;

        const dbo = db.db("myDatabase");
        dbo.collection("studentinfo").insertOne(myObj, (error, result) => {
            if (error) {
                res.send("Error", error);
                return;
            }
            res.send(result);
            db.close();
        });
    });
});

app.put('/api/students/:id', (req, res) => {
    const id = req.params.id;

    //You need to require the ObjectID function from your mongo. It is needed for PUT and DELETE requests
    const objectId = ObjectId(id);

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;

    console.log(first_name, last_name, age, id, objectId);

    const where = { _id: objectId }
    const myObj = { $set: { first_name: first_name, last_name: last_name, age: age } };

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;

        const dbo = db.db("myDatabase");
        dbo.collection("studentinfo").updateOne(where, myObj, (error, result) => {
            if (error) {
                res.send("Error", error);
                return;
            }
            if (result.modifiedCount === 1)
                res.send("Record updated successfully");
            db.close();
        });
    });
});


app.delete('/api/students/:id', (req, res) => {
    const id = req.params.id;
    const objectId = ObjectId(id);

    console.log(id, objectId);

    const myObj = { _id: objectId }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;

        const dbo = db.db("myDatabase");
        dbo.collection("studentinfo").deleteOne(myObj, (error, result) => {
            if (error) {
                res.send("Error", error);
                return;
            }
            if (result.deletedCount === 1)
                res.send("Record deleted successfully");
            db.close();
        });
    });
});


app.listen(5000, () => {
    console.log("The server is up and running on port 5000");
})