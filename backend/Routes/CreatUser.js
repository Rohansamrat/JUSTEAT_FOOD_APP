const express = require("express")
const router = express.Router()
const User = require("../models/User.js")
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtSecret = "MynameisEndtoEndRohanSamratNIT$#"

router.post("/creatuser", [
    check('email').isEmail(),
    check('name').isLength(),
    check('password', 'Incorrect Password').isLength({ min: 5 })
]
    , async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            }).then(res.json({ success: true }));


        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

router.post("/loginuser",
    [
        check('email').isEmail(),
        check('password', 'Incorrect Password').isLength({ min: 5 })
    ]
    , async (req, res) => {
            console.log("hello");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        console.log(email);
        try {
            let userData = await User.findOne({ email });
            console.log(userData);
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials!! " });
            } 
            console.log(req.body.password);
            console.log(userData.password);
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            console.log(pwdCompare)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials " });
            }
            
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken });
        }
        catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    });


module.exports = router;