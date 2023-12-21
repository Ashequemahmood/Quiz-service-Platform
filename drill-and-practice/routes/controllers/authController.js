import {
  isEmail,
  minLength,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import { bcrypt } from "../../deps.js";
import * as usersService from "../../services/usersService.js";

const validationRules = {
  email: [isEmail],
  password: [minLength(4)],
};

const getData = async (request) => {
  const data = {
    email: "",
    password: "",
    verification: "",
    errors: null, // or errors: {}
  };

  if (request) {
    const body = request.body({ type: "form" });
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password");
    data.verification = params.get("verification");
  }

  return data;
};

const showRegisterForm = async ({ render }) => {
  render("registration.eta");
};

const registerUser = async ({ request, response, render }) => {
  //   const body = request.body({ type: "form" });
  //   const params = await body.value;
  //   const email = params.get("email");
  //   const password = params.get("password");
  //   const verification = params.get("verification");

  const data = await getData(request);

  if (data.password !== data.verification) {
    response.redirect("/auth/registration");
    return;
  }

  const existingUser = usersService.findUsersWithEmail(data.email);
  if (existingUser.length > 0) {
    response.redirect("/auth/registration");
    return;
  }

  const hash = await bcrypt.hash(data.password);

  //   validate
  const [passes, errors] = await validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    render("registration.eta", data);
  } else {
    // data was ok, could store it
    await usersService.addUser(data.email, hash);
    response.redirect("/auth/login");
  }
};

const showLoginForm = async ({ render }) => {
  render("login.eta");
};

const loginUser = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");

  const rows = await usersService.findUsersWithEmail(email);

  if (rows.length === 0) {
    response.status = 401;
    return;
  }
  const userObj = rows[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("authenticated", true);
  await state.session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });

  response.body = "Authentication successful!";
  response.redirect("/topics");
};

export { loginUser, registerUser, showLoginForm, showRegisterForm };
