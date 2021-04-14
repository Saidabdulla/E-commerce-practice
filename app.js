const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

// Import routes
const mainRoute = require('./routes/mainRoute');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// connect to db
mongoose.connect('mongodb://localhost/ecommerce', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDBga muvaffaqiyatli ulandik!'))
    .catch((e) => console.log(e));


// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));
app.use(helmet());


app.use('/', mainRoute);
app.use('/admin', adminRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ish boshladi!`));
