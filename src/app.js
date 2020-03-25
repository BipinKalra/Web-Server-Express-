const path = require("path"),
  express = require("express"),
  hbs = require("hbs"),
  geocode = require("./utils/geocode"),
  weather = require("./utils/weather");

//Default variables in node
// console.log(__dirname) // Current directory absolute location
// console.log(__filename) // Current file absolute location

// console.log(path.join(__dirname,"../public")) // Reaching the path of public directory to be served up

// Expess has just one function express() and the rest of the functionality needs to be added using the app variable
const app = express()

// This constant is defined to use dynamic port number assigned by heroku instead of using local port
const port = process.env.PORT || 9000 // 9000 is the fallback value which would be used locally

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
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address!"
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    weather(latitude, longitude, (error, {temperature, precipProbability} = {}) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        temperature,
        precipProbability,
        address: req.query.address,
        location
      })
    })
  })

  // res.send({
  //   Forecast: "Something",
  //   location: "Delhi",
  //   address: req.query.address
  // })
})

// Using Query string recieved along with request to perform some action
// app.get("/products", (req, res) => {
//   // console.log(req.query) // this variable contains the query strings in form of an object

//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term!"
//     })
//   }

//   console.log(req.query.search)
//   res.send({
//     products: []
//   })
// })

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

app.listen(port, () => {
  console.log("Server up on port" + port)
})

