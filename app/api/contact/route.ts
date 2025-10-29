// File: app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Cache the pool connection in the global scope.
// This allows the same connection pool to be reused across serverless function invocations.
let pool: Pool;

function getPool() {
  if (!pool) {
    console.log('Creating new database connection pool...');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Optional: Konfigurasi tambahan untuk produksi
      // max: 20,
      // idleTimeoutMillis: 30000,
      // connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validasi input sederhana
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const client = await getPool().connect();
    try {
      const query = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, email, message];
      const result = await client.query(query, values);

      return NextResponse.json({
        message: 'Message sent successfully!',
        data: result.rows[0],
      }, { status: 201 });

    } finally {
      client.release();
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
