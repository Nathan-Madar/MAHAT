const discountsService = require('../services/discounts.service');

async function getAll(req, res, next) {
    try {
        res.json(await discountsService.getAll());
    } catch (err) {
        console.error(`Error while getting discounts`, err.message);
        next(err);
    }
}

async function postDiscount(req, res, next) {
    try {
        res.json(await discountsService.postDiscount(
            req.body.name,
            req.body.description,
            req.body.percent
        ));
    } catch (err) {
        console.error(`Error while saving discount`, err.message);
        next(err);
    }
}

async function putDiscount(req, res, next) {
    try {
        res.json(await discountsService.putDiscount(
            req.body.id,
            req.body.name,
            req.body.description,
            req.body.percent
        ));
    } catch (err) {
        console.error(`Error while updating discount`, err.message);
        next(err);
    }
}

async function deleteDiscount(req, res, next) {
    try {
        res.json(await discountsService.deleteDiscount(req.body.id));
    } catch (err) {
        console.error(`Error while deleting discount`, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    postDiscount,
    putDiscount,
    deleteDiscount
};