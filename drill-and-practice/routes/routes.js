import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as optionsController from "./controllers/optionsController.js";
import * as quizController from "./controllers/quizController.js";
import * as api from "./apis/api.js";
import * as authController from "./controllers/authController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.listsTopic);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);

router.post("/topics/:id/questions", questionsController.addQuestion);
router.get("/topics/:id", questionsController.listQuestion);

router.get("/topics/:id/questions/:qId", optionsController.listOption);
router.post("/topics/:id/questions/:qId/options", optionsController.addOption);
router.post(
  "/topics/:id/questions/:qId/options/:oId/delete",
  optionsController.deleteOption,
);

router.post(
  "/topics/:id/questions/:qId/delete",
  questionsController.deleteQuestion,
);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:id", quizController.showRandomQuestion);
router.get("/quiz/:id/questions/:qId", quizController.answerOptions);
router.post(
  "/quiz/:id/questions/:qId/options/:oId",
  quizController.chosenAnswerOption,
);
router.get("/quiz/:id/questions/:qId/correct", quizController.correct);
router.get("/quiz/:id/questions/:qId/incorrect", quizController.incorrect);

// API
router.get("/api/questions/random", api.listQuestion);
router.post("/api/questions/answer", api.apiAnswer);



// login, registration
router.get("/auth/login", authController.showLoginForm);
router.post("/auth/login", authController.loginUser);
router.get("/auth/registration", authController.showRegisterForm);
router.post("/auth/registration", authController.registerUser);

export { router };
