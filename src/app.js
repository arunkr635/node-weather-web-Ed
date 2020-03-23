const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Arun",
    message: "Its Hot outside, Kochi, India"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Arun",
    message: "Hello Darkness my Old friend"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help message",
    title: "Help ",
    name: "Arun"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must Provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error
          });
        }
        res.send({
          Data: forecastData,
          location: location
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search key"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { title: "404", message: "Help not found!", name: "Arun" });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404", message: "page not found!", name: "Arun" });
});

app.listen(port, () => {
  console.log(`Listening to port : ${port}`);
});
