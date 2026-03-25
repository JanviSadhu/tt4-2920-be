const User = require("../models/user");
const bcrypt = require("bcrypt");

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


module.exports = { register };