const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getAll);

router.get('/admin', productsController.getAllAdmin);

router.get('/category', productsController.getByCategory);

router.get('/subcategory', productsController.getBySubCategory);

router.get('/id', productsController.getById);

router.get('/name', productsController.getByName);

router.get('/names', productsController.getNames);

router.post('/add', productsController.postProduct);

router.put('/amount', productsController.putAmount)

router.put('/', productsController.putProduct)

module.exports = router;