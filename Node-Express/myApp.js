const express = require("express"); //dependencies
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); //Mounted Global Middleware Function (bodyParser)

//Chaining Middleware / GET and POST requests on /name route: Query Parameter Input From The Client
//Challenge 1: Build an API endpoint, mounted at GET /name. Respond with a JSON document with { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query string
app
  .route("/name")
  .get(function (req, res) {
    //console.log(req.query);
    const firstname = req.query.first;
    const lastname = req.query.last;
    const jsonObject = { name: `${firstname} ${lastname}` };
    res.json(jsonObject);
  })
  .post(function (req, res) {
    console.log(req.body);
    const firstname = req.body.first;
    const lastname = req.body.last;
    const jsonResponse = { name: `${firstname} ${lastname}` };
    res.json(jsonResponse);
  });

app.use("/public", express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//Middleware for static assets -> Intercept route handlers (adding some kind of information/modifying request or response objects)
//app.use(path, middlewareFunction) -> path is optional, if not used middleware will be executed for all requests

app.get("/", function (req, res) {
  res.send("Hello Express");
}); // '/' -> Root URL

//Challenge 2: Serve JSON data on a specific route (basic API to serve data)
app.get("/json", function (req, res) {
  res.json({ message: "Hello json" });
});

//Challenge 3: Using the .env file (environment variables for the application)
//console.log(process.env)
const MESSAGE_STYLE = process.env["MESSAGE_STYLE"];
app.get("/json", function (req, res) {
  const data = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    data["message"] = data["message"].toUpperCase();
  }
  res.json(data);
});

//Challenge 4: Implementing Root-Level Request Logger Middleware
app.use(function (req, res, next) {
  //log 'method path - ip' to the
  const strlog = `${req.method} ${req.path} - ${req.ip}`;
  //console.log(strlog);
  next();
});

//Challenge 5: Chaining Middleware (Time Server Implementation):
// '/now' endpoint must return the current time in a JSON object
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

//Route parameters(Letting the user request specific data)
//Challenge 6: Get Route Parameter Input from the Client by building an echo server mounted at route GET/:word/echo
app.get("/:word/echo", function (req, res) {
  const word = req.params.word;
  res.json({ echo: word });
});

module.exports = app;
