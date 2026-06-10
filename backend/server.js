const express = require('express');
// const cors = require('cors');

const dotenv = require('dotenv');
const connectDB = require('./config/db');




dotenv.config();

const app = express();
// app.use(cors({
//     origin: "http://127.0.0.1:5500", 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
