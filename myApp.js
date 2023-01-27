//BASICS OF Express.js

let express = require("express");
let app = express();
console.log("Hello World");
app.get("/", function (req, res) {
  res.send("Hello Express");
}); // '/' -> Root URL

//Middleware for static assets -> Intercept route handlers (adding some kind of information/modifying request or response objects)
//app.use(path, middlewareFunction) -> path is optional, if not used middleware will be executed for all requests
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Task 1: Serve JSON data on a specific route (basic API to serve data)
app.get("/json", function (req, res) {
  res.json({ message: "Hello json" });
});

// Task 2: Using the .env file (environment variables for the application)
console.log(process.env);
const MESSAGE_STYLE = process.env["MESSAGE_STYLE"];
app.get("/json", function (req, res) {
  const data = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    data["message"] = data["message"].toUpperCase();
  }
  res.json(data);
});

// Task 3: Implementing Root-Level Request Logger Middleware
app.use(function (req, res, next) {
  //log 'method path - ip' to the
  const strlog = `${req.method} ${req.path} - ${req.ip}`;
  console.log(strlog);
  next();
});

//Task 4: Chaining Middleware (Time Server):
// /now endpoint must return the current time in a JSON object
app.get(
  "/now",
  function (req, res, next) {
    const time = new Date().toString();
    req.time = time;
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

//Route Parameters (Letting the user request specific data)
//Task 5: Get Route Parameter Input from the client by building an echo server mounted at route GET/:word/echo
app.get("/:word/echo", function (req, res) {
  const word = req.params.word;
  res.json({ echo: word });
});

//Query Parameter Input From The Client
//Task 6: Build an API endpoint, mounted at GET /name. Respond with a JSON document with { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query string
app.route("/name").get(function (req, res) {
  console.log(req.query);
  const firstname = req.query.first;
  const lastname = req.query.last;
  const jsonObject = { name: `${firstname} ${lastname}` };
  res.json(jsonObject);
});

module.exports = app;
