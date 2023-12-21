import { sql } from "../database/database.js";

const add_question_answers = async (
  user_id,
  question_id,
  question_answer_option_id,
) => {
  return await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) 
    VALUES (${user_id}, ${question_id}, ${question_answer_option_id})`;
};

const getId = async (question_id) => {
  return await sql`SELECT * FROM question_answers WHERE question_id 
    = ${question_id}`;
  
};

export { add_question_answers, getId };
