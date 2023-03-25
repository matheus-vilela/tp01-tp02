import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export async function query(query: string, value?: any[]) {
  const client = await pool.connect();
  try {
    if(value) {
      const response = await client.query(query, value);
      client.release();
      return response.rows;
    } else {
      const reponse = await client.query(query);
      client.release();
      return reponse.rows;
    }
  } catch (error) {
    console.log('🚫 ==> ', error);
    client.release();
    throw error;
  }
}
