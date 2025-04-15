export type Category = {
    name: string,
    color: string
}

export type Expense = {
    description: string,
    amount: number,
    category: Category,
    date: Date
}