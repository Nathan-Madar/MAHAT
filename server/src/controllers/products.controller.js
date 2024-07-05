const productsService = require('../services/products.service');

async function getAll(req, res, next) {
    try {
        res.json(await productsService.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting all products`, err.message);
        next(err);
    }
}

async function getAllAdmin(req, res, next) {
    try {
        res.json(await productsService.getAllAdmin(req.query.page));
    } catch (err) {
        console.error(`Error while getting all products`, err.message);
        next(err);
    }
}

async function getByCategory(req, res, next) {
    try {
        res.json(await productsService.getByCategory(req.query.value));
    } catch (err) {
        console.error(`Error while getting products by category`, err.message);
        next(err);
    }
}

async function getBySubCategory(req, res, next) {
    try {
        res.json(await productsService.getBySubCategory(req.query.value));
    } catch (err) {
        console.error(`Error while getting products by sub-category`, err.message);
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        res.json(await productsService.getById(req.query.value));
    } catch (err) {
        console.error(`Error while getting products by id`, err.message);
        next(err);
    }
}

async function getByName(req, res, next) {
    try {
        res.json(await productsService.getByName(req.query.value));
    } catch (err) {
        console.error(`Error while getting products by name`, err.message);
        next(err);
    }
}

async function getNames(req, res, next) {
    try {
        res.json(await productsService.getNames());
    } catch (err) {
        console.error(`Error while getting product names`, err.message);
        next(err);
    }
}

async function postProduct(req, res, next) {
    try {
        res.json(await productsService.addProduct(
            req.body.name,
            req.body.amount,
            req.body.sellingPrice,
            req.body.costPrice,
            req.body.upc,
            req.body.image,
            req.body.minAmountBeforeRestock,
            req.body.isHidden,
            req.body.displayQuantity,
            req.body.displayPrice,
            req.body.description,
            req.body.discount_id,
            req.body.category_id
        ));
    } catch (err) {
        console.error(`Error while saving product`, err.message);
        next(err);
    }
}

async function putAmount(req, res, next) {
    try {
        res.json(await productsService.putAmount(req.body.id, req.body.amount));
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
}

async function putProduct(req, res, next) {
    try {
        res.json(await productsService.putProduct(
            req.body.id,
            req.body.category_id,
            req.body.name,
            req.body.amount,
            req.body.sellingPrice,
            req.body.costPrice,
            req.body.upc,
            req.body.image,
            req.body.minAmountBeforeRestock,
            req.body.isHidden,
            req.body.displayQuantity,
            req.body.displayPrice,
            req.body.description,
            req.body.discount_id
        ));
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getByCategory,
    getBySubCategory,
    getById,
    getByName,
    getNames,
    postProduct,
    getAllAdmin,
    putAmount,
    putProduct
};