import { sql } from "../database/database.js";

const addOption = async (questionId, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES 
    (${questionId}, ${optionText}, ${isCorrect})`;
};

const listOption = async (questionId) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const findQuestionAnswerOptionsById = async (question_id) => {
  const rows =
    await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
  if (rows && rows.length > 0) {
    return rows[0];
  }
};

const deleteOption = async (id) => {
  return await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const updateOption = async (question_id) => {
  const rows = await sql`UPDATE question_answer_options
  SET is_correct = TRUE
  WHERE question_id = ${question_id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }
};

const countOptions = async () => {
  const rows = await sql`SELECT COUNT(*) AS count from question_answer_options`;
  return rows[0].count;
};

export {
  addOption,
  countOptions,
  deleteOption,
  findQuestionAnswerOptionsById,
  listOption,
  updateOption,
};
