import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { age, weight, height } = await req.json();

        const numericAge = age ? parseInt(age) : undefined;
        const numericWeight = weight ? parseFloat(weight) : undefined;
        const numericHeight = height ? parseFloat(height) : undefined;

        const newCalGoal = ((4.54 * weight) + (15.88 * height) - (5 * age) + 5);
        const newProGoal = parseInt(weight);
        const newFatGoal = ((newCalGoal * 0.25)/9);
        const newCarGoal = ((newCalGoal - (newProGoal * 4) - (newFatGoal*9))/4);

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                ...(numericAge && { age: numericAge }),
                ...(numericWeight && { weight: numericWeight }),
                ...(numericHeight && { height: numericHeight }),
                ...(newCalGoal && { cal_Goal: newCalGoal }),
                ...(newProGoal && { pro_Goal: newProGoal }),
                ...(newFatGoal && { fat_Goal: newFatGoal }),
                ...(newCarGoal && { car_Goal: newCarGoal }),
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}