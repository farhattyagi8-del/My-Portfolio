const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const router  = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



// Login route


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt with email:', email);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Valid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;