import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1);
    }
}
