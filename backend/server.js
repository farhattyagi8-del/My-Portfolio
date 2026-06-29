
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const passport = require('passport');
require('./Config/passport'); 
console.log("passport loaded")// Ensure passport config is loaded

const connectDB = require('./Config/DB');



const app = express();


const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500' ,'https://my-portfolio-psi-ivory-67.vercel.app'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(
session({
secret: process.env.SESSION_SECRET,
resave:false,
saveUninitialized:false
})
);

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.json({});
});

app.get("/api/auth/test", (req, res) => {
    res.send("Backend working");
});

console.log("AUTH ROUTES LOADED");
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();