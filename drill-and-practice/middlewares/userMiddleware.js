import * as userService from "../services/usersService.js";

const userMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (user) {
    const userFromDatabase = await userService.findUsersWithEmail(user.email);
    context.user = userFromDatabase[0];
  }

  await next();
};

export { userMiddleware };
