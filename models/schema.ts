import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    expenses: {
        type: Schema.Types.ObjectId,
        ref: "Expense"
    },
})

const expenseSchems = new mongoose.Schema({
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
        required: true
    }
});

const User = mongoose.model("User", userSchema);
const Expense = mongoose.model("Expense", expenseSchems);

export {
    User,
    Expense
}