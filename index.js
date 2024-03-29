const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const db = require("./config/mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const customMware = require("./config/middleware");
const env = require("./config/environment");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;
require("./config/view-helpers")(app);

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      oututStyle: "extended",
      prefix: "/css",
    })
  );
}

const store = new MongoDBStore({
  mongooseConnection: db,
  uri: `mongodb://127.0.0.1:27017/${env.db}`,
  collection: "mySessions",
  autoRemove: "disabled",
});
store.on("error", function (error) {
  console.log("Error in connceting to MongoStore", error);
});

app.use(express.urlencoded({ extnded: true }));
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use(expressLayouts);
//make the uploads path avaliable to browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(logger(env.morgan.mode, env.morgan.options));
//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(
  require("express-session")({
    name: "InstaBook",
    secret: env.session_cookie_key,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hr
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use("/", require("./routes"));
app.listen(port, function (error) {
  if (error) {
    //interpolation method
    console.log(`Error in running the server : ${error}`);
  }
  console.log(`Server is running on port : ${port}`);
});
