import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Expense } from "@/types/types";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ExpenseListProps {
    expenses: Expense[]
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{expense.description}</TableCell>
                                <TableCell>
                                    <Badge style={{backgroundColor: "red"}} className="text-white">{expense.category.name}</Badge>
                                </TableCell>
                                <TableCell>{expense.amount.toFixed(2)}</TableCell>
                                <TableCell>{formatDistance(expense.date, new Date(), { addSuffix: true })}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
};

export  default ExpenseList;