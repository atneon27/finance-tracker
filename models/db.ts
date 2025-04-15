import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log("Connected to DB")
    } catch (error) {
        throw new Error("Error while connecting to DB")
    }
}

connect()

export default connect;