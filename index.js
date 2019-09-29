/**
 * IMPORT EXTERNAL
 */
const express = require('express');
const app = express();
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
/**
 * config session
 */
app.use(session({
    secret: 'alsdh93e9d927d',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }
}));

app.use(cors({}))
/**
 * IMPORT INTERNAL
 */
const accountRoute = require('./src/controllers/users');
// const accountIPFS = require('./src/controllers');
const prescriptionReute = require('./src/controllers/prescriptions');
/**
 * APP CONFIG
 */
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser);
app.use(body.json());

app.get('/', (req, res)=>{
    res.redirect('/tao-ho-so');
})

app.get('/tao-ho-so', (req, res) => {
    res.render('index');
})
app.use(accountRoute);
// app.use(accountIPFS);
app.use(prescriptionReute);

const uri = `mongodb://150.95.113.214/DucSkt`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=> console.log(`Server started at port`));
})