const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        console.log(name, email, password);

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, Email and Password are required!"
            });
        }

        const existingUser = await User.findOne({email: String(email).toLowerCase()});

        if(existingUser){
            return res.status(409).json({
                message: "Email is already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully.",
            data: {
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error while registering user."
        });
    }
    
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required!"
            });
        }

        // Find user by email
        const user = await User.findOne({ email: String(email).toLowerCase() });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "your-secret-key-change-this",
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful.",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while logging in."
        });
    }
};

module.exports = { register, login };