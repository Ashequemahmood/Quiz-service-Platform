import * as topicsService from "../../services/topicsService.js";
import * as questionsService from "../../services/questionsService.js";
import * as optionsService from "../../services/optionsService.js";

const showMain = async ({ render }) => {
  const data = {
    topicsCount: await topicsService.countTopics(),
    questionsCount: await questionsService.countQuestions(),
    optionsCount: await optionsService.countOptions(),
  };

  render("main.eta", data);
};

export { showMain };
