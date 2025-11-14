import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE_NAME = "admin_auth"

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD is not set")
    return NextResponse.json(
      { error: "Admin authentication is not configured" },
      { status: 500 },
    )
  }

  const body = await request.json().catch(() => null)

  if (!body?.password) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 })
  }

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })

  res.cookies.set(ADMIN_COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  })

  return res
}
