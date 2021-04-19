const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');

// Import routes
const mainRoute = require('./routes/mainRoute');
const adminMainRoute = require('./routes/adminMainRoute');
const adminPhonesRoute = require('./routes/adminPhonesRoute');
const adminComputersRoute = require('./routes/adminComputersRoute');
const adminBooksRoute = require('./routes/adminBooksRoute');

const app = express();

// connect to db
mongoose.connect('mongodb://localhost/ecommerce', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDBga muvaffaqiyatli ulandik!'))
    .catch((e) => console.log(e));


// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));



app.use('/', mainRoute);
app.use('/admin', adminMainRoute);
app.use('/admin/phones', adminPhonesRoute);
app.use('/admin/computers', adminComputersRoute);
app.use('/admin/books', adminBooksRoute);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ish boshladi!`));
