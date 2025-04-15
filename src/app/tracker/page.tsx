"use client"

import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import ExpenseFilter from "./ExpenseFilter";    
import ExpenseList from "./ExpenseList";
import AddExpenseDialog from "./AddExpenseDialog";
import { useEffect, useState } from "react";
import { Expense } from "@/types/types";
import axios from "axios";
import { setEngine } from "crypto";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: '/api/expenses',
                    headers: {
                        'Authorization': `Bearer 67feba85941d0c49cfbfe8f4.5_4HGN5YasdUPJbDLsC3jx0V6uv--nTKLHgYPz5Ob04`
                    }
                })
                console.log(response.data.result)
                setExpenses(response.data.result)
            } catch (error) {
                console.error(error)
            }
        }

        fetchExpenses()
    }, [])

    const handleAddExpense = () => {
        console.log("handleAddExpense")
    }

    const categories = [
        {
            id: "food",
            name: "Food",
            color: "#FF9900"
        },
        {
            id: "transport",
            name: "Transport",
            color: "#0099FF"
        }
    ]
    
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Expense Tracker</h1>
                <div className="flex gap-4 items-center flex-wrap">
                    <ThemeToggle />
                    <AddExpenseDialog 
                        categories={categories}
                        onAddExpense={handleAddExpense}
                    />
                    <Button variant="outline" asChild>
                        <Link href="/analytics">
                            <BarChart3 className="mr-2 h-4 w-4" size={20}/>
                            Analytics
                        </Link>
                    </Button>
                </div>
            </div>
            <ExpenseFilter />
            <ExpenseList 
                expenses={expenses}
            />
        </div>
    )
}

export default ExpenseTracker;