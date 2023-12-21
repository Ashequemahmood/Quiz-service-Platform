import { sql } from "../database/database.js";

const randomQuestions = async (topic_id) => {
  const rows =
    await sql`SELECT * FROM questions WHERE topic_id = ${topic_id} ORDER BY random()`;
  if (rows.length > 0) {
    return rows[0];
  }
};

const getOption = async (id) => {
  const rows =
    await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
  if (rows.length > 0) {
    return rows[0];
  }
};

const findOption = async (question_id) => {
  const rows =
    await sql`SELECT * FROM question_answer_options WHERE is_correct = TRUE AND question_id = ${question_id}`;
  if (rows.length > 0) {
    return rows[0];
  }
};

export { findOption, getOption, randomQuestions };
