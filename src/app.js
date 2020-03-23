const path = require("path")
const express = require("express")

//Default variables in node
// console.log(__dirname) // Current directory absolute location
// console.log(__filename) // Current file absolute location

// console.log(path.join(__dirname,"../public")) // Reaching the path of public directory to be served up

// Expess has just one function express() and the rest of the functionality needs to be added using the app variable
const app = express()

const publicPath = path.join(__dirname, "../public")
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

app.get("/weather", (req, res) => {
  res.send({
    Forevast: "Something",
    location: "Delhi"
  })
})

app.listen(9000, () => {
  console.log("Server up on port 9000!")
})

