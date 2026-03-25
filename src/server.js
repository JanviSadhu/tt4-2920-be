const app = require('./app');
const { connectDB } = require('./config/db');

const startServer = async () => {
    try{
   await connectDB();

   app.listen(5000, () => {
    console.log('Server is running .....');
 });
} catch(error){
    console.log("Failed to start the server", error);
    process.exit(1);
}
};
startServer();