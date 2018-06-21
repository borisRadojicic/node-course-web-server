const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware built in 
// static - serves the absolute path to the file we want to serve up
// __dirname serves path to app dir

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// handler for http get requests
// root of the app - /
// app.get('/', (req, res) => {
//     //res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Boris',
//         likes: [
//             'Travel',
//             'Food'
//         ]
//     });
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome dear guest'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

// bad, json with an error mes prop
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'The request is impossible to process'
    });
});

// port 3000 - common for developing locally
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});