import mongoose, { mongo } from "mongoose";

declare global {
    var mongoose: {
        conn: mongoose.Mongoose | null,
        promise: Promise<mongoose.Mongoose> | null
    }
}

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const connect = async () => {
    try {
        if(cached.conn) {
            console.log("Using cached connection")
            return cached.conn
        }

        if(!cached.promise) {
            cached.promise = (async () => {
                const conn = await mongoose.connect(process.env.DATABASE_URL!);
                console.log("Connected to DB")
                return conn
            })()
        }

        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        throw new Error("Error while connecting to DB")
    }
}

export default connect;