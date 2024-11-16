import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const validEmail = process.env.EMAIL;
  const validPassword = process.env.PASS;
  try {
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide email and password" },
        { status: 400 }
      );
    }

    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    const reponse = NextResponse.json(
      {
        message: "Login successful",
      },
      { status: 200 }
    );
    reponse.cookies.set({
      name: "token",
      value:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24, // 1 day,
      priority: "high",
      secure: true,
    });
    return reponse;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
