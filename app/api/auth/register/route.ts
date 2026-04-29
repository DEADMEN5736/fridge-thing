import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

function testNanoid(length = 21) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
  console.log(`used testNanoid to generate ID: ${length}`);
}

export async function POST(req: NextRequest) {
  let makeId: (size?: number) => string;
  if (process.env.NODE_ENV === "test") {
    makeId = testNanoid;
  } else {
    // Dynamic import for dev/prod
    const { nanoid } = await import("nanoid");
    makeId = nanoid;
    console.log("nanoid imported for ID generation");
  }

  try {
    const { firstName, lastName, email, password, confirmPassword } =
      await req.json();

    // --- Validation ---
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    // --- Check for existing user ---
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 },
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

    const verificationToken = makeId(32);
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: verificationToken,
        expires,
      },
    });

    const { origin } = new URL(req.url);
    const verificationUrl = `${origin}/api/verify?token=${verificationToken}`;
    await sendVerificationEmail({ to: email, verificationUrl });

    return NextResponse.json(
      {
        message: "Account created successfully. Please verify your email.",
        userId: user.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[register] error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
