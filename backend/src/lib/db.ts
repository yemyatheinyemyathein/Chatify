import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const connn = await mongoose.connect(process.env.MONGO_URI || "");
        console.log("MONGODB Connected:", connn.connection.host);
    } catch(error) {
        console.log("Error connection to MongoDB: ",error);
        process.exit(1);
    }
}