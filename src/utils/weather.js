const request = require("request")

const weather = (latitude, longitude, callback) => {
  const url = "https://api.darksky.net/forecast/dd2f1f18a45729116d6efae80c5f7989/" + latitude + "," + longitude

  request({
    url,
    json: true
  }, (error, response) => {
    if (error) {
      callback("Can't connect to weather service!")
    }
    else if (response.body.error) {
      callback("Unable to find the location!")
    }
    else {
      const weatherData = response.body.currently

      // console.log("It is currently " + weatherData.temperature + " degrees out.")
      // console.log("There is " + weatherData.precipProbability + "% chance of rain.")

      callback(undefined, {
        temperature: weatherData.temperature,
        precipProbability: weatherData.precipProbability
      })
    }
  })
}

module.exports = weather