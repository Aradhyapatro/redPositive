const mongoose = require("mongoose");
const colors = require("colors");
const db = async () => {
    await mongoose.connect(process.env.mongo_db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB database'.bgCyan.underline.yellow))
        .catch(error => console.log('Error connecting to MongoDB database:', error.message));

};

module.exports = { db };