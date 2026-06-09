const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const router  = express.Router();

router.post('/register', async  (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400) .json({message: 'User already exists'});
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({message: 'Internal server error'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User ({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User Register"
    });


})

module.exports = router;