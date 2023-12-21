import * as quizService from "../../services/quizService.js";
import * as topicsService from "../../services/topicsService.js";
import * as questionsService from "../../services/questionsService.js";
import * as optionsService from "../../services/optionsService.js";
import * as answersService from "../../services/answersService.js"

const listTopics = async ({ render }) => {
  const listTopics = await topicsService.listTopics();
  render("listTopics.eta", { listTopics: listTopics });
};

const showRandomQuestion = async ({ render, params, response }) => {
  const topic = await topicsService.findTopicById(params.id);
  const randomQuestions = await quizService.randomQuestions(params.id);
  render("showRandomQuestion.eta", { topic, randomQuestions });
  response.redirect(`/quiz/${topic.id}/questions/${randomQuestions.id}`);
};

const answerOptions = async ({ render, params}) => {
  
  const topic = await topicsService.findTopicById(params.id);
  const question = await questionsService.findQuestionById(params.qId);
  const options = await optionsService.listOption(params.qId);
  
  render("answerOptions.eta", { topic, question, options });
};

let data = {
  qId: "",
  oId: "",
};

const chosenAnswerOption = async ({ params, response, render }) => {
  
  const topic = await topicsService.findTopicById(params.id);
  const question = await questionsService.findQuestionById(params.qId);
  const options = await quizService.getOption(params.oId);

  
  await answersService.add_question_answers(topic.user_id, question.id, options.id)
 
  
  data.qId = params.qId;
  data.oId = params.oId;

  if (!options.is_correct) {
    response.redirect(`/quiz/${topic.id}/questions/${question.id}/incorrect`);
    render("answer.eta", { options });
  } else {
    response.redirect(`/quiz/${topic.id}/questions/${question.id}/correct`);
    render("answer.eta", { options });
  }
};

const correct = async ({ render, params }) => {
  const topic = await topicsService.findTopicById(params.id);
  const options = await quizService.getOption(data.oId);
  const correctAns = await quizService.findOption(data.qId);
  render("correct.eta", { options, topic, correctAns });
};

const incorrect = async ({ render, params }) => {
  const topic = await topicsService.findTopicById(params.id);
  const options = await quizService.getOption(data.oId);
  const correctAns = await quizService.findOption(data.qId);
  render("incorrect.eta", { options, topic, correctAns });
};

export {
  answerOptions,
  chosenAnswerOption,
  correct,
  incorrect,
  listTopics,
  showRandomQuestion,
};
