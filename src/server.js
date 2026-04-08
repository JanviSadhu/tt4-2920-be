const dotenv = require('dotenv');

const app = require('./app');
const { connectDB } = require('./config/db');
//dotenv.config({path: path.resolve(__dirname, "../.env")});
dotenv.config();
const startServer = async () => {
    try {
        await connectDB();
        app.listen(5000, () => {
            console.log('Server is running on port 5000.....');
        });
    } catch (error) {
        console.log("Failed to start the server", error);
        process.exit(1);
    }
};

startServer();