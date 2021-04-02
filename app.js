const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// Import routes
const mainRoute = require('./routes/main');

const app = express();

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));
app.use(helmet());


app.use('/', mainRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ish boshladi!`));
