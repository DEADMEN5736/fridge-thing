"use server"; // Required for Server Actions

import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function recordMealAction(recipe) {
    const user = await getAuthUser();
    if (!user) throw new Error("Unauthorized");

    // Update the user in the actual Database
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            cal_Prog: { increment: recipe.cal },
            pro_Prog: { increment: recipe.p },
            car_Prog: { increment: recipe.c },
            fat_Prog: { increment: recipe.f },
        },
    });

    // This tells Next.js to refresh the data on the page
    revalidatePath("/recipes/[id]", "page");

    return updatedUser;
}