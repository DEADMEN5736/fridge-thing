import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// GET: Fetch the pantry data
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("fridge_auth_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { userPantry: true },
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

// POST: Update a specific item's quantity
export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("fridge_auth_token")?.value;

        // Parse the body
        const { itemName, newQuantity } = await req.json();

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // MongoDB/Prisma Update logic
        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: {
                userPantry: {
                    updateMany: {
                        where: { itemName: itemName },
                        data: { quantity: newQuantity }
                    }
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[API_USER_POST] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}