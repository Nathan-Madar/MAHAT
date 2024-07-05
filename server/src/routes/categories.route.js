const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');

router.get('/category', categoriesController.getCategories);

router.get('/subcategory', categoriesController.getSubCategories);

module.exports = router;