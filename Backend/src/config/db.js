import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongodb_Uri, );
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;