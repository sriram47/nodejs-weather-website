const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config including custom handlebars path.
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars engine and custom path
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set up static directory path.
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sriram'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sriram'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is a help page.',
        title: 'Help',
        name: 'Sriram'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            //console.log('Error', error)
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                //forecast: location,
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })   
    
    //console.log(req.query.address);
    
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('error', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Sriram'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('error', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Sriram'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})