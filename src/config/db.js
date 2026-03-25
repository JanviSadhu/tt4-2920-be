const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = "mongodb+srv://sadhujanvi909_db_user:84mFbHwt4dcVpbtk@cluster0.sbskgt4.mongodb.net/?appName=Cluster0/tt4-2920";
    mongoose.connect(mongoUri);
    await mongoose.connect(mongouri);

    console.log("MongoDB connected successfully!");
};

module.exports = { connectDB };