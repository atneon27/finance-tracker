import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers"
import { User, Expense } from "@/models/schema"
import connect from "@/models/db"
import crypto from "crypto"
import mongoose from "mongoose"
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants";


export async function GET(request: Request) {
    const authorization = (await headers()).get('authorization')
    const token = authorization?.split(' ')[1]
    
    try {
        await connect()

        if(!token) {
            return NextResponse.json({
                result: [],
                count: 0
            })
        } else {
            const userId = verifyId(token)
            const objectUserId = new mongoose.Types.ObjectId(userId)
            const user = await User.findOne({ _id: objectUserId })
            if(!user) {
                throw new Error('Invalid User')
            }
            const expenses = await Expense.find({ 
                userId: objectUserId 
            }, {
                _id: 0,
                userId: 0,
                __v: 0
            })

            return NextResponse.json({
                result: expenses,
                count: expenses.length
            })
        }
    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error",
        }, {
            status: 500
        })
    }
} 

function signId(id: string) {
    const hmac = crypto.createHmac('sha256', process.env.ID_SECRET!)
    hmac.update(id)
    const signature=  hmac.digest('base64url')
    return `${id}.${signature}`
}

function verifyId(token: string) {
    const [id, sig] = token.split('.')
    const hmac = crypto.createHmac('sha256', process.env.ID_SECRET!)
    hmac.update(id)
    if(hmac.digest('base64url') !== sig) {
        throw new Error('Invalid Signature')
    }
    return id
}

export async function POST(request: NextRequest) {
    const authorization = (await headers()).get('authorization')
    const token = authorization?.split(' ')[1]

    try {
        await connect()
        const body = await request.json()

        if(!token) {
            const user = await User.create({})
            const expense = await Expense.create({
                userId: user._id,
                description: body.description,
                category: body.category,
                amount: body.amount,
            })

            const signedId = signId(user._id.toString())
            return NextResponse.json({
                msg: "New User Created and Expense Added",
                signedId: signedId
            }, {
                status: 200
            })
        } else {
            const userId = verifyId(token)
            const objectUserId = new mongoose.Types.ObjectId(userId)
            const user = await User.findOne({ _id: objectUserId })
            if(!user) {
                throw new Error('Invalid User')
            }

            const expense = await Expense.create({
                userId: objectUserId,
                description: body.description,
                category: body.category,
                amount: body.amount,
            })

            return NextResponse.json({
                msg: "Expense Added",
            }, {
                status: 200
            })
        }
    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error",
        }, {
            status: 500
        })
    }
}