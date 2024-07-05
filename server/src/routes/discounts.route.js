const express = require('express');
const router = express.Router();
const dicountsController = require('../controllers/discounts.controller');

router.get('/', dicountsController.getAll);

router.post('/add', dicountsController.postDiscount);

router.put('/update', dicountsController.putDiscount)

router.delete('/delete', dicountsController.deleteDiscount)

module.exports = router;