const request = require("request")

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmlwaW5rYWxyYSIsImEiOiJjazgxb3Z1d2gwOGVmM2VwdHQzbWZmZnJkIn0.91vjZjXQ2yjhpbRueqasWg&limit=1"

  request({
    url,
    json: true
  }, (error, response) => { // Here also we can use destructuring to only get response.body since that is the only attribute we use
    if (error) {
      callback("Can't connect to weather service!")
    }
    else if (response.body.message || response.body.features.length === 0) {
      callback("Unable to find the location!")
    }
    else {
      const geoData = response.body.features[0]

      callback(undefined, {
        latitude: geoData.center[1],
        longitude: geoData.center[0],
        location: geoData.place_name
      })
    }
  })
}

module.exports = geocode