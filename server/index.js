const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const productsRouter = require('./src/routes/products.route');
const categoriesRouter = require('./src/routes/categories.route');
const salesRouter = require('./src/routes/sales.route');
const discountsRouter = require('./src/routes/discounts.route');
const algoRouter = require('./src/routes/algo.route');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/sales', salesRouter);
app.use('/discounts', discountsRouter);
app.use('/algo', algoRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
