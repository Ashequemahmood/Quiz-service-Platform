import * as optionsService from "../../services/optionsService.js";
import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";

const addOption = async ({ request, params, response }) => {
  const body = request.body({ type: "form" });
  const param = await body.value;
  const optionText = param.get("option_text");
  const isCorrect = param.has("is_correct");

  // validate The option_text must contain at least one character.
  await optionsService.addOption(params.qId, optionText, isCorrect);
  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

const listOption = async ({ render, params }) => {
  const data = {
    topics: await topicsService.findTopicById(params.id),
    questions: await questionsService.findQuestionById(params.qId),
    options: await optionsService.listOption(params.qId),
  };
  // console.log(data)

  render("options.eta", data);
};

const deleteOption = async ({ response, params }) => {
  await optionsService.deleteOption(params.oId);
  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

export { addOption, deleteOption, listOption };
