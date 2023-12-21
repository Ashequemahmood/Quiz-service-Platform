import * as topicsService from "../../services/topicsService.js";
import {
  minLength,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import * as usersService from "../../services/usersService.js";

const getData = async (request) => {
  const data = {
    name: "",
    errors: null, // or errors: {}
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
  }

  return data;
};

const validationRules = {
  name: [minLength(6)],
};

const addTopic = async ({ request, response, render, state }) => {
  const user = await state.session.get("user");
  console.log(user);
  const getAdmin = await usersService.getAdmin(user.id);
  console.log(getAdmin.admin);
  const data = await getData(request);

  const [passes, errors] = await validate(data, validationRules);

  if (passes && getAdmin.admin) {
    console.log("No validation errors.");
    await topicsService.addTopic(user.id, data.name);
    response.redirect("/topics");
  } else {
    console.log(errors);
    data.errors = errors;
    render("topics.eta", data);
  }
};

const listsTopic = async ({ render, state }) => {
  const user = await state.session.get("user");
  const getAdmin = await usersService.getAdmin(user.id);

  const topics = await topicsService.listTopics(user.id);
  if (getAdmin.admin) {
    render("topics.eta", { topics: topics });
  } else {
    render("showTopics.eta", { topics: topics });
  }
};

const deleteTopic = async ({ response, params, state }) => {
  const user = await state.session.get("user");
  const getAdmin = await usersService.getAdmin(user.id);

  if (getAdmin.admin) {
    await topicsService.deleteTopic(params.id);
    response.redirect("/topics");
  }
};

export { addTopic, deleteTopic, listsTopic };
