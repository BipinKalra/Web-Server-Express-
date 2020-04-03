const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault() // Function just prevents the default behaviour of the browser ie to refresh the page on form submission

  const location = search.value

  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""

  // The call below needs to be changed in order for it to run fine on heroku
  // instead of using localhost in the addess in fetch we can specify relative path
  fetch("/weather?address=" + location).then((response) => {

    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error)
        messageOne.textContent = data.error
      }
      else {
        // console.log(data)

        messageOne.textContent = "Weather Update for - " + data.location
        messageTwo.textContent = "It is " + data.temperature + " degrees outside and there is " + data.precipProbability + " chances of rain!"
      }
    })
  })
})

// DEPRECATED CODE FOR LEARNING

// This is function to fetch data from an server endpoint and is called from client side js
// That means that node doesn't have anything known as fetch but all modern browsers do!

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   // Here callback is provided in the .then method which has access to response

//   // Herein then would run once the json data has arrived and has been parsed
//   response.json().then((data) => {
//     console.log(data)
//   })
// })