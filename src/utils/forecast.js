const request = require('request')



const forecast = (address1, address2, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1c1396b5c93e20b4a600c01139de6d2&query='+ encodeURIComponent(address1) + ','+ encodeURIComponent(address2) +'&units=f'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.error) {
            callback('Unable to determine the location. Please try again.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The current humidity is '+ body.current.humidity +'%.'
                // currentTemp: response.body.current.temperature,
                // currentFeelsLike: response.body.current.feelslike,
                // weatherDesc: response.body.current.weather_descriptions[0]
            )
        }
    })
}

module.exports = forecast