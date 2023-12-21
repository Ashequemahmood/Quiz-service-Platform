import { sql } from "../database/database.js";

const addUser = async (email, passwordHash) => {
  await sql`INSERT INTO users (email, password) VALUES (${email}, ${passwordHash})`;
};

const findUsersWithEmail = async (email) => {
  return await sql`SELECT * FROM users WHERE email = ${email}`;
};

const getAdmin = async (id) => {
  const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
  if (rows && rows.length > 0) {
    return rows[0];
  }
};

export { addUser, findUsersWithEmail, getAdmin };
