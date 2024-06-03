const db = require("../config/connection")
const mongoose = require("mongoose")
const { User } = require("../models/index");
const users = require("./users.json")

db.once("open", async () => {
    try {
        await User.db.dropDatabase();
        await User.insertMany(users);
    } catch (err) {
        console.error(err)
    }
    process.exit();
});