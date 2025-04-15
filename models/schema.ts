import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const expenseSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);    
const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export {
    User,
    Expense
}