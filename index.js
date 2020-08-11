const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"./.env")
})
const ifEquality = require("./views/helpers/ifEquality");
const app = express();
const auth = require("./middleware/auth");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");
const passiveAuth = require("./middleware/passiveAuth");

app.use(cookieParser());
// Creating handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality
  }
});

// Let express know to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", passiveAuth, (req, res) => {
  console.log(req.jwt);

  res.render("home.hbs", {
    layout: "login.hbs",
    title: "HomePage",
    isUser: req.jwt ? req.jwt.sub === "user" : false
    // formTitle: "UserLogin",
    // submitMethod: "post",
    // submitTarget: "/user/friends"
  });
});

app.get("/login", auth, (req, res) => {
  res.render("userLogin.hbs", {
    // layout: "loginForm.hbs",
    // formTitle: "UserLogin",
    // submitMethod: "post",
    // submitTarget: "/user/friends"
  });
});

app.get("/userLogin", (req, res) => {
  res.render("userLogin.hbs", {
    layout: "loginForm.hbs",
    formTitle: "UserLogin",
    submitMethod: "post",
    submitTarget: "/user/friends",
    title: "userLoginPage"
  });
});

app.get("/friends", (req, res) => {
  console.log("you are here and work is in progress");
  var friends = req.cookies.data;
  if (friends != undefined) {
    console.log(req.cookies);
    console.log({ ...friends });
    res.render("friends.hbs", {
      layout: "login.hbs",
      formTitle: "Friends",
      data: friends,
      title: "friendsPage"
      // submitMethod: "post",
      // submitTarget: "/user/friends"
    });
  } else res.redirect("/login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("data");
  res.redirect("/");
});

app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("server running");
});
