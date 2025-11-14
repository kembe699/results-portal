import { NextResponse } from "next/server"

const ADMIN_COOKIE_NAME = "admin_auth"

export async function POST() {
  const res = NextResponse.json({ success: true })

  res.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })

  return res
}
