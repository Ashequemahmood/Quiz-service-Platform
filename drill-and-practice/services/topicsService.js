import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES(${userId}, ${name})`;
};

const listTopics = async () => {
  return await sql`SELECT * FROM topics ORDER BY name`;
};

const deleteTopic = async (id) => {
  return await sql`DELETE FROM topics WHERE id = ${id}`;
};

const findTopicById = async (id) => {
  const rows = await sql`SELECT * FROM topics WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  // return { id: 0, name: "Unknown" };
};

const countTopics = async () => {
  const rows = await sql`SELECT COUNT(*) AS count from topics`;
  return rows[0].count;
};

export { addTopic, countTopics, deleteTopic, findTopicById, listTopics };
