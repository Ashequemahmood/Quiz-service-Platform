import { sql } from "../../database/database.js";
import * as answersService from "../../services/answersService.js"
import * as quizService from "../../services/quizService.js"


const listQuestion = async ({response, request}) => {
  const body = request.body({type: "json"})
  const content = await body.value;

  const rows = await sql`SELECT * FROM questions ORDER BY random()`
  console.log(rows[0].id)
  const options = await sql`SELECT id, option_text FROM question_answer_options WHERE 
  question_id = ${rows[0].id}`
  console.log(options)

  if(rows.length > 0){
    response.body = {
      questionId: rows[0].id,
      questionText: rows[0].question_text,
      answerOptions: options.map(item=>({ optionId: item.id, optionText: item.option_text }))
  }
  }else{
    response.body = {}
  }
}

const apiAnswer = async ({request, response}) => {
  const body = request.body({type: "json"})
  const json = await body.value;
  const questionId = json.questionId;
  const optionId = json.optionId;

  const getOption = await sql`SELECT * FROM question_answer_options WHERE id = ${optionId}`
  const option = getOption[0];
  console.log(option)

  response.body = {
    correct: option.is_correct
  }
}

export {listQuestion, apiAnswer}
