const path = require("path")
const express = require("express")
const hbs = require("hbs")

//Default variables in node
// console.log(__dirname) // Current directory absolute location
// console.log(__filename) // Current file absolute location

// console.log(path.join(__dirname,"../public")) // Reaching the path of public directory to be served up

// Expess has just one function express() and the rest of the functionality needs to be added using the app variable
const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to be served by express
app.use(express.static(publicPath))

// Get defines what to do for a particular route
// app.get("", (req, res) => {
//   res.send("<h1>Hello from Express!</h1>") // Sending HTML using res.send
// })

// index.html is automatically bound to the route url and thus the above call get function doesn't work in case
// of having setup public index.html file

// app.get("/help", (req, res) => {
//   res.send({
//     name: "Bipin",
//     age: 22
//   }) // Sending JSON using res.send
// })

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page!</h1>")
// })

app.get("", (req, res) => {
  // res.render("index") // Used to render html or hbs documents in our case

  // To add dynamic content as well
  res.render("index", {
    title: "Weather App",
    name: "Bipin Kalra"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me!",
    name: "Bipin Kalra"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Bipin Kalra"
  })
})

app.get("/weather", (req, res) => {
  res.send({
    Forevast: "Something",
    location: "Delhi"
  })
})

// * is a wildcard character provided by express which says that match anything that hasn't been matched so far
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error!",
    errorMsg: "Help article not found!",
    name: "Bipin Kalra"
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error!",
    errorMsg: "404 Page Not Found!",
    name: "Bipin Kalra"
  })
})

app.listen(9000, () => {
  console.log("Server up on port 9000!")
})

