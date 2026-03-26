import mongoose from "mongoose";
declare var process: any;
export const connectDB = async () => {
    try{

        const {MONGO_URI} = process.env;
        if(!MONGO_URI) throw new Error("MONGO URI is not set");

        const connn = await mongoose.connect(process.env.MONGO_URI || "");
        console.log("MONGODB Connected:", connn.connection.host);
    } catch(error) {
        console.log("Error connection to MongoDB: ",error);
        process.exit(1);
    }
}