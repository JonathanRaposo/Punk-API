require('dotenv').config()
const hbs = require('hbs')
const express = require('express');
const app = express();

// punkAPI class
const PunkApiWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkApiWrapper();

// log http requests and status
const logger = require('morgan');
app.use(logger('dev'));

// make public availabe everywhere
app.use(express.static(__dirname + '/public'))

// create an absolute path to the views folder
app.set('views', __dirname + '/views');

// make handle bar as view engine

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res) => {
    res.render('index.hbs')
})

// GET- retreive the beers

app.get('/beers', (req, res) => {

    punkAPI
        .getBeers()
        .then((beersFromDB) => {
            // console.log('Data: ', beersFromDB)
            res.render('beers.hbs', { beers: beersFromDB });
        })
        .catch((err) => console.log('Error retreiving beers: ', err))

})
// GET - retreive specific beer
app.get('/beers/:id', (req, res) => {
    console.log('parameter: ', req.params)
    const { id } = req.params;
    punkAPI
        .getBeer(id)
        .then((beerFromDb) => {
            // console.log('One beer: ', beerFromDb)
            res.render('beer.hbs', { beer: beerFromDb });
        })
        .catch((err) => console.log('Error while getting specific bear: ', err))
})

//  get a random beer 

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then((beerFromDB) => {
            // console.log('Random beer: ', beerFromDB)
            res.render('random-beer.hbs', { beer: beerFromDB })
        })
        .catch((err) => console.log('Error while getting random beer: ', err))
})



PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`sever running on port ${PORT}`))