const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

app.use(express.static(path.join(__dirname, '../public/'))); // download static files
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.set('view options', { layout: 'layouts/main' });
hbs.registerPartials(path.join(__dirname, '../views/partials'));

app.get('/', (req, res) => {
    res.render('home');
});

const es = require('./es');

app.get('/diagnosis/:facts', async function (req, res) {
    const facts = JSON.parse(req.params.facts)
    await es.diagnose(facts);
    res.json(facts);
});

const port = process.env.PORT || 3000;

app.listen(port);
