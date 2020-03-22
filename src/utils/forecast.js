const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b16fad96e267db72a7e9368cb92864ad/${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.currently.temperature,
        percipitationProb: response.body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
