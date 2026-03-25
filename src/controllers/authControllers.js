const register = (req, res) => {

    console.log(req.body);
    const{ name, email, password } = req.body;

    console.log(name, email, password);
    if(!name || !email || !password){
        return res.status(400).json({
            message: "Name, email and password are required "
        });
    }


   

    return res.json({
        message: "Register endpoint is working!"
    });
};
module.exports = {
    register
};