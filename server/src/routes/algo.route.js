const express = require('express');
const router = express.Router();
const algoController = require('../controllers/algo.controller');

router.get('/product', algoController.getProductToRestock);

module.exports = router;