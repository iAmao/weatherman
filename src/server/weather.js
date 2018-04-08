import https from 'https'

const { GOOGLE_API_KEY, WEATHER_API_KEY } = process.env

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  console.log(req.body)

  const city = req.body.result.parameters['geo-city']

  getLocations(city)
    .then((cities) => {
      if (Object.keys(cities).length > 1) {
        const response = `I found ${Object.keys(cities).length} cities with a similar name.
          "${Object.keys(cities).join('" and "')}". You'll have to specify which one.
          I'm not that smart... yet :)`
        return res.json({
          speech: response,
          displayText: response
        })
      } else {
        return getWeatherByLocation(Object.values(cities)[0])
          .then((result) => {
            const response = `Well, its ${result.weather.currently.summary} with a temperature of about ${result.weather.currently.temperature}°F`
            return res.json({
              speech: response,
              displayText: response
            })
          })
      }
    }).catch(error => console.log('weatherForecast', error.message))
}

function getLocations (city) {
  return new Promise((resolve, reject) => {
    let body = ''
    return https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`, (res) => {
      res.on('data', data => { body += data.toString('utf-8') })
      res.on('end', () => {
        return resolve(JSON.parse(body).results.reduce((a, b) => {
          if (a[b.formatted_address]) {
            a[b.formatted_address].push(b)
          } else {
            a[b.formatted_address] = [b]
          }
          return a
        }, {}))
      })
    })
  })
}

function getWeatherByLocation (location) {
  let body = ''
  return new Promise((resolve, reject) => {
    const { lat, lng } = location[0].geometry.location
    https.get(`https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}`, (res) => {
      res.on('data', data => { body += data.toString('utf-8') })
      res.on('end', () => {
        return resolve({
          location,
          weather: JSON.parse(body)
        })
      })
    })
  })
}
