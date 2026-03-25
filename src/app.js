const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    //res.send('<h1>Hello World</h1>');
    return res.json({
        message: "Endpoint home is working"
    });
});

app.post("/test", (req, res) => {
    return res.json({
        message: "Endpoint test is working",
        data: {
            ok: true,
            age: 99
        }
    });
});

app.use("/auth", authRoutes);


app.listen(5000, () => {
    console.log('Server is running .....');
});