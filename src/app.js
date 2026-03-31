const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
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
app.use("/tasks", taskRoutes);

module.exports = app;