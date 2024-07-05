const categoriesService = require('../services/categories.service');

async function getCategories(req, res, next) {
    try {
        res.json(await categoriesService.getCategories());
    } catch (err) {
        console.error(`Error while getting categories`, err.message);
        next(err);
    }
}

async function getSubCategories(req, res, next) {
    try {
        res.json(await categoriesService.getSubCategories());
    } catch (err) {
        console.error(`Error while getting sub-categories`, err.message);
        next(err);
    }
}

module.exports = {
    getCategories,
    getSubCategories
};