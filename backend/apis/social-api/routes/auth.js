const router = require("express").Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password 
        });

        await newUser.save();

        res.send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal server error");
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.password !== req.body.password) {
            return res.status(401).json("Invalid password");
        }

        res.status(200).json("Login successful");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;