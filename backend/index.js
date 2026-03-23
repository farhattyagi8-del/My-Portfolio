const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/portfolio")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

//schema 

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
app.post("/Contact", async (req, res) => {
    await Contact.create(req.body);
    res.send(" Message saved");
});

app. listen(5000, () => {
    console.log("Server is running on port 5000");
});

let user 