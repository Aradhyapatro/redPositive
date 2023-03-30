const sendinblue = require('sendinblue-api');
const path = require("path");
const cors = require("cors");
const express = require("express");
const { db } = require("./config/db");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer")
const { errorHandler } = require('./middleware/errorMiddleware')

//temp
const { Tables } = require("./Model/model");


// constants
const port = process.env.port || 5000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database connection
db();

// routes
// posting a data
app.post("/api/post", async (req, res) => {
    const { name, phone, email, hobbies } = req.body;

    if (!name || !email || !phone || !hobbies) {
        res.status(400);
        throw new Error("Please Enter the Fields");
    }


    // id is defined for the data
    const table = await Tables.find({});
    const id = Object.keys(table).length + 2001;


    const data = await Tables.create({
        id,
        name,
        phone,
        email,
        hobbies,
    });

    // create reusable transporter object using the default SMTP transport





    if (data) {
        res.status(201).json({
            id: data.id,
            name: data.name,
            email: data.email,
            hobbies: data.hobbies,
        });
    } else {
        res.status(500).json({ message: "Could'nt enter the data" });
    }
})

// get all the data
app.get("/api/", async (req, res) => {
    const data = await Tables.find({});
    res.status(200).json(data);
})

app.get("/api/:id", async (req, res) => {
    const data = await Tables.findOne({ id: req.params.id });
    res.status(200).json(data);
})

// deleting by id
app.delete("/api/:id", async (req, res) => {
    const id = req.params.id;

    Tables.findOneAndRemove({ id: id })
        .then((data) => {
            if (!data) {
                res.status(400).send(id + ' was not found');
            } else {
                res.status(200).send(id + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
})

// update the data
app.patch("/api/:id", async (req, res) => {
    let { name, phone, email, hobbies } = req.body;
    const id = req.params.id

    if (!id) {
        res.status(400);
        throw new Error("Please Enter the Fields");
    }

    const data = await Tables.findOne({ id: id });

    if (!data) {
        res.status(400);
        throw new Error("No Such Data");
    }


    if (!name) {
        name = data.name;
    }

    if (!email) {
        email = data.email;
    }

    if (!phone) {
        phone = data.phone;
    }

    if (!hobbies) {
        hobbies = data.hobbies;
    }

    const updatedData = await Tables.findOneAndUpdate({ id: req.params.id }, { id, name, phone, email, hobbies }, {
        new: true,
        insert: true,
    });
    res.status(200).json(updatedData);
})

// server frontend
if (process.env.node_env === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "client", "build", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => {
        res.send("Please set to production");
    });
}


// errorhandler
app.use(errorHandler);

// listening to port : 8000 by default
app.listen(port, () => {
    console.log(`Server is running in the port:${port}`);
});

module.exports.handler = serverless(app);