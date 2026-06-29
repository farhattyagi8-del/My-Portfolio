const express = require('express');
const sendEmail = require("../Config/sendEmail");
console.log("authRoutes file loaded")// Ensure this file is being loaded
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router  = express.Router();


//register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
        
    if(!name || !email ||!password){
        return res.status(400).json({
            message: "All fields required"
        });
    }

    try {
        const existingUser = await User.findOne({ email  });  //checking if user already exists
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
             password: hashedPassword,
        });

        const otp = Math.floor(100000 + Math.random()*900000).toString();
        newUser.otp = otp; 
        newUser.otpExpire = Date.now() + 5*60*1000;
        newUser.isVerified = false;

        await newUser.save();
        await sendEmail( email,
            otp );

        return res.status(201).json({
            message: 'OTP sent',});

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.post( "/verify-otp", async(req,res)=>{

try{

const { email,otp
} = req.body; const user = await User.findOne({email});

if(!user){

return res.status(404)
.json({message:"User not found"});

}

if(user.otp !== otp){

return res.status(400)
.json({message:"Invalid OTP"});

}

if(
!user.otpExpire || user.otpExpire < Date.now()){
return res.status(400)
.json({
message: "OTP expired"});

}

user.isVerified = true;
user.otp = null;
user.otpExpire = null;

await user.save();

console.log("USER VERIFIED:", user.email);
console.log("STATUS:", user.isVerified);

return res.json({

message:
"Email verified"});

}

catch(error){

    console.error( "Verify OTP error:", error)

return res.status(500)
.json({

message:
"Server error"
});

}

});



// Login route


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt with email:', email);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

         if(!user.isVerified){
            return res.status(403).json({
                message: "Verify Email first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
       
        console.log('Password match:', isMatch);
       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({  message: "Login successful", token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//google auth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, async (err, user) => {
        try {
            if (err || !user) {
                const errorMessage = err?.message || 'User not authenticated';
                return res.redirect(`https://my-portfolio-psi-ivory-67.vercel.app/auth.html?error=${encodeURIComponent(errorMessage)}`);
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const redirectUrl = `https://my-portfolio-psi-ivory-67.vercel.app/index.html?token=${encodeURIComponent(token)}&login=success`;
            return res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error during Google authentication:', error);
             return res.redirect(`https://my-portfolio-psi-ivory-67.vercel.app/auth.html?error=${encodeURIComponent(error.message)}`);
        }
    })(req, res, next);
});

router.get('/test', (req, res) => {
  res.send('test route working');
});

console.log("AUTH ROUTES FILE FINISHED");

module.exports = router;