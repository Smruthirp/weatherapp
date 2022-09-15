const request =require(`request`)

const forecast = ({lat,long},callback) => {
    const url = `http://api.weatherstack.com/current?access_key=787d750c60781c455c009165107bc743&query=` + lat + `,` + long
    request ({url:url, json :true}, (error,response) => {
        if (error) {
        callback(`Unable to connect to weather service!`)
        } else if (response.body.error) {
        callback(`Unable to find location!`)
        } else {
        callback(undefined, response.body.current)
        }
    })
}

module.exports = forecast