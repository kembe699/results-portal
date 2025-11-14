import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  if (!process.env.DATABASE_URL) {
    console.error("Database configuration missing. Please set DATABASE_URL environment variable.")
    return NextResponse.json(
      { error: "Database configuration error. Please contact the administrator." },
      { status: 500 },
    )
  }

  try {
    const sql = neon(process.env.DATABASE_URL)
    const rows = await sql`SELECT id, staff_id, full_name, department, acls_theory_marks, acls_practical_marks, bls_theory_marks, bls_practical_marks FROM training_results ORDER BY created_at DESC`
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to load results. Please ensure your database is configured correctly." },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.DATABASE_URL) {
    console.error("Database configuration missing. Please set DATABASE_URL environment variable.")
    return NextResponse.json(
      { error: "Database configuration error. Please contact the administrator." },
      { status: 500 },
    )
  }

  const body = await request.json().catch(() => null)

  if (!body || !body.staff_id || !body.full_name) {
    return NextResponse.json(
      { error: "staff_id and full_name are required" },
      { status: 400 },
    )
  }

  const {
    staff_id,
    full_name,
    department = "",
    acls_theory_marks = null,
    acls_practical_marks = null,
    bls_theory_marks = null,
    bls_practical_marks = null,
  } = body

  try {
    const sql = neon(process.env.DATABASE_URL)

    await sql`
      INSERT INTO training_results (
        staff_id,
        full_name,
        department,
        acls_theory_marks,
        acls_practical_marks,
        bls_theory_marks,
        bls_practical_marks
      ) VALUES (
        ${staff_id},
        ${full_name},
        ${department},
        ${acls_theory_marks},
        ${acls_practical_marks},
        ${bls_theory_marks},
        ${bls_practical_marks}
      )
      ON CONFLICT (staff_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        department = EXCLUDED.department,
        acls_theory_marks = EXCLUDED.acls_theory_marks,
        acls_practical_marks = EXCLUDED.acls_practical_marks,
        bls_theory_marks = EXCLUDED.bls_theory_marks,
        bls_practical_marks = EXCLUDED.bls_practical_marks,
        updated_at = NOW()
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Failed to save result. Please ensure your database is configured correctly." },
      { status: 500 },
    )
  }
}
