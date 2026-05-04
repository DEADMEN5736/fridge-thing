import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, confirmPassword } =
      await req.json();

    // --- Validation ---
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // --- Check for existing user ---
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    // --- Hash password & create user ---
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
      },
    });

    const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          firstName: user.firstName
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" },
    )


    const response = NextResponse.json(
        {message: "Account created successfully.", userId: user.id},
        {status: 201}
    );

    response.cookies.set("fridge_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return response;

  } catch (error) {
    console.error("[register] error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
