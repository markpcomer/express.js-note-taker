//Import express package
const express = require('express');

//Initialize our app variable by setting it to the value of express()
const app = express();

//Create a PORT variable
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
