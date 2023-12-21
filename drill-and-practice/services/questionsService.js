import { sql } from "../database/database.js";

const addQuestion = async (user_id, topic_id, question_text) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES
     (${user_id}, ${topic_id}, ${question_text})`;
};

const listQuestion = async (topic_id) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;

  return rows;
};

const findQuestionById = async (id) => {
  const rows = await sql`SELECT * FROM questions WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }
};

const deleteQuestion = async (id) => {
  return await sql`DELETE FROM questions WHERE id = ${id}`;
};

const countQuestions = async () => {
  const rows = await sql`SELECT COUNT(*) AS count from questions`;
  return rows[0].count;
};

export {
  addQuestion,
  countQuestions,
  deleteQuestion,
  findQuestionById,
  listQuestion,
};
