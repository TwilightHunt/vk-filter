import * as VKStrategy from "passport-vkontakte";
import passport from "passport";

const authOptions = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.BASE_URL,
};

passport.use(
  new VKStrategy(authOptions, (accessToken, refreshToken, params, profile, done) => {
    User.findOrCreate({ vkontakteId: profile.id })
      .then(function (user) {
        done(null, user);
      })
      .catch(done);
  })
);

// const callbackService = new CallbackService();

// const flow = new ImplicitFlowUser({
//   callbackService,
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   login: process.env.LOGIN,
//   password: process.env.PASSWORD,
//   scope: "all",
//   apiVersion: "5.131",
// });
// export async function run() {
//   console.log(process.env.LOGIN);
//   flow
//     .run()
//     .then((response) => {
//       console.log(response.token); // выводится, все супер
//     })
//     .then((r) => {
//       // console.log(vk.token); // null !!!
//     })
//     .catch((error) => console.log(error));

//   process.env.TOKEN = response.token;
//   console.log(process.env.TOKEN);

//   //   console.log("Token:", response.token);
//   //   console.log("Expires:", response.expires);

//   //   console.log("Email:", response.email);
//   //   console.log("User ID:", response.userId);
// }
