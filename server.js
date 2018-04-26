const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = mongoose();
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


var reservation = require('./controllers/reservationController');

app.use('*', cors());
app.use(bodyParser.json());

const userSchema = require('./graphql/index').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));


app.get('/reservations', reservation.getAll);
app.get('/reservation/:id', reservation.getById);
app.post('/reservation', reservation.create);

// view engine setup
// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('index');
    next();
});

// Up and Running at Port 4001
app.listen(process.env.PORT || 4001, () => {
  console.log('A GraphQL API running at port 4001');
});
