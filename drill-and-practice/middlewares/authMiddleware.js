// const authMiddleware = async ({request, response, state}, next) => {
//     if(request.url.pathname.startsWith("/topics")){
//         if(await state.session.get("authenticated")){
//             await next();
//         }else{
//             response.redirect("/auth/login")
//         }
//     }else{
//        await next();
//     }
// };

const restrictedPaths = ["/topics", "/quiz"];

const authMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (
    !user &&
    restrictedPaths.some((path) =>
      context.request.url.pathname.startsWith(path)
    )
  ) {
    context.response.redirect("/auth/login");
  } else {
    await next();
  }
};

export { authMiddleware };
