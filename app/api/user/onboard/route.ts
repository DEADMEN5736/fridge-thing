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

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                ...(numericAge && { age: numericAge }),
                ...(numericWeight && { weight: numericWeight }),
                ...(height && { height: height }),
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}