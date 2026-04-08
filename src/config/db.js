const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI ?? "mongodb+srv://sadhujanvi909_db_user:84mFbHwt4dcVpbtk@cluster0.sbskgt4.mongodb.net/?appName=Cluster0";
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully!");
};

module.exports = { connectDB };