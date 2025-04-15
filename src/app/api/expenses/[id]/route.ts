import connect from "@/models/db"
import { Expense } from "@/models/schema"
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: {
        params: {
            id: string
        }
    }
) {
    return NextResponse.json({
        msg: "Hello world",
        id: params.id
    })
}