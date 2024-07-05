const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');

router.post('/sale', salesController.postSaleDetails);

router.get('/sales', salesController.getAll);

router.put('/handle', salesController.putHandleSale)

module.exports = router;