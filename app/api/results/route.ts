import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const staffId = searchParams.get('staff_id')

  if (!staffId) {
    return NextResponse.json(
      { error: 'Staff ID is required' },
      { status: 400 }
    )
  }

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('Database configuration missing. Please set DATABASE_URL environment variable.')
    return NextResponse.json(
      { error: 'Database configuration error. Please contact the administrator.' },
      { status: 500 }
    )
  }

  try {
    // Initialize Neon serverless SQL client
    const sql = neon(process.env.DATABASE_URL)
    
    // Query the database using PostgreSQL syntax
    const rows = await sql`SELECT * FROM training_results WHERE staff_id = ${staffId}`

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Staff ID not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch results. Please ensure your database is configured correctly.' },
      { status: 500 }
    )
  }
}
