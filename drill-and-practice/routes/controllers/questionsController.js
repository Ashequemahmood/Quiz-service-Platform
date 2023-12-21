import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";

const addQuestion = async ({ request, response, params, state }) => {
  const user = await state.session.get("user");
  const body = request.body({ type: "form" });
  const param = await body.value;

  const questionText = param.get("question_text");

  await questionsService.addQuestion(user.id, params.id, questionText);

  response.redirect(`/topics/${params.id}`);
};

const listQuestion = async ({ render, params }) => {
  const data = {
    questions: await questionsService.listQuestion(params.id),
    topics: await topicsService.findTopicById(params.id),
  };

  render("questions.eta", data);
};

const deleteQuestion = async ({ response, params }) => {
  await questionsService.deleteQuestion(params.qId);
  response.redirect(`/topics/${params.id}`);
};

export { addQuestion, deleteQuestion, listQuestion };
