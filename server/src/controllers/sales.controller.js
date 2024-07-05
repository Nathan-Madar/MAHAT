const salesService = require('../services/sales.service');

async function getAll(req, res, next) {
    try {
        res.json(await salesService.getAllSales(req.query.page));
    } catch (err) {
        console.error(`Error while getting all sales`, err.message);
        next(err);
    }
}

async function postSaleDetails(req, res, next) {
    try {
        res.json(await salesService.postSaleDetails(
            req.body.customersName,
            req.body.customersPhone,
            req.body.customersEmail,
            req.body.totalPrice,
            req.body.description,
            req.body.paymentMethod,
            req.body.soldOnline,
            req.body.discountOnSaleId,
            req.body.customersCountry,
            req.body.customersCity,
            req.body.customersZip,
            req.body.customersAddress,
            req.body.productReceived,
            req.body.products
        ));
    } catch (err) {
        console.error(`Error while saving sale`, err.message);
        next(err);
    }
}

async function putHandleSale(req, res, next) {
    try {
        res.json(await salesService.putHandleSale(req.body.sale));
    } catch (err) {
        console.error(`Error while updating sale`, err.message);
        next(err);
    }
}

module.exports = {
    postSaleDetails,
    getAll,
    putHandleSale
};