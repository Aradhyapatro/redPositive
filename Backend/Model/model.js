const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            requires: [true, "Please Enter ID"],
        },
        name: {
            type: String,
            required: [true, "Please Enter the name"],
        },
        phone: {
            type: Number,
            required: [true, "Please Enter the Phone Number"],
        },
        email: {
            type: String,
            required: [true, "Please Enter the email"],
        },
        hobbies: {
            type: String,
            required: [true, "Please Enter the hobbies"],
        },
    },
    {
        timestamps: true,
    }
);

const Tables = mongoose.model("Table", tableSchema);

module.exports = { Tables };