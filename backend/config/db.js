const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error(" MONGO_URI is missing from environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "expenseDB", 
        });

        console.log(`MongoDB Connected Successfully`);
    } catch (error) {
        console.error(` MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
   