var fs = require('fs');
const db = require('./db.service');

const path = './src/services/SQL/products/'

async function getAll() {
    var sql = fs.readFileSync(path + 'all.sql').toString();
    const rows = await db.select(sql);
    return {
        rows
    }
}

async function getAllAdmin() {
    var sql = fs.readFileSync(path + 'allAdmin.sql').toString();
    const rows = await db.select(sql);
    return {
        rows
    }
}

async function getByCategory(value) {
    var sql = fs.readFileSync(path + 'by_category.sql').toString();
    const rows = await db.select(sql, [value]);
    return {
        rows
    }
}

async function getBySubCategory(value) {
    var sql = fs.readFileSync(path + 'by_subcategory.sql').toString();
    const rows = await db.select(sql, [value]);
    return {
        rows
    }
}

async function getById(value) {
    var sql = fs.readFileSync(path + 'by_id.sql').toString();
    const rows = await db.select(sql, [value]);
    return {
        rows
    }
}

async function getByName(value) {
    var sql = fs.readFileSync(path + 'by_name.sql').toString();
    const rows = await db.select(sql, ['%' + value + '%']);
    return {
        rows
    }
}

async function getNames() {
    var sql = fs.readFileSync(path + 'names.sql').toString();
    const rows = await db.select(sql, []);
    return {
        rows
    }
}

async function postProduct(
    name,
    amount,
    sellingPrice,
    costPrice,
    upc,
    image,
    minAmountBeforeRestock,
    isHidden,
    displayQuantity,
    displayPrice,
    description,
    discount_id
) {
    var sql = fs.readFileSync(path + 'add.sql').toString();
    const productId = await db.insertOne(sql, [
        name,
        JSON.parse(amount),
        JSON.parse(sellingPrice),
        JSON.parse(costPrice),
        upc,
        image,
        JSON.parse(minAmountBeforeRestock),
        JSON.parse(isHidden),
        JSON.parse(displayQuantity),
        JSON.parse(displayPrice),
        description,
        JSON.parse(discount_id)
    ]);
    return {
        productId
    }
}

async function postProductCategories(productId, categoryId) {
    var sql = fs.readFileSync(path + 'add_category.sql').toString();
    const rows = await db.insertOne(sql, [
        productId,
        JSON.parse(categoryId)
    ]);
    return {
        rows
    }
}

async function addProduct(
    name,
    amount,
    sellingPrice,
    costPrice,
    upc,
    image,
    minAmountBeforeRestock,
    isHidden,
    displayQuantity,
    displayPrice,
    description,
    discount_id,
    categoryId
) {
    let productId = (await postProduct(
        name,
        amount,
        sellingPrice,
        costPrice,
        upc,
        image,
        minAmountBeforeRestock,
        isHidden,
        displayQuantity,
        displayPrice,
        description,
        discount_id
    )).productId

    await postProductCategories(productId, categoryId)

    return {

    }
}

async function putAmount(productId, amount) {
    var sql = fs.readFileSync(path + 'update_amount.sql').toString();
    const rows = await db.update(sql, [productId, amount]);
    return {
        rows
    }
}

async function putProduct(
    productId,
    categoryId,
    name,
    amount,
    sellingPrice,
    costPrice,
    upc,
    image,
    minAmountBeforeRestock,
    isHidden,
    displayQuantity,
    displayPrice,
    description,
    discount_id
) {
     var sql = fs.readFileSync(path + 'update_product.sql').toString();
    await db.update(sql, [
        name,
        JSON.parse(amount),
        JSON.parse(sellingPrice),
        JSON.parse(costPrice),
        upc,
        image,
        JSON.parse(minAmountBeforeRestock),
        JSON.parse(isHidden),
        JSON.parse(displayQuantity),
        JSON.parse(displayPrice),
        description,
        JSON.parse(discount_id),
        JSON.parse(productId)
    ]);

    sql = fs.readFileSync(path + 'update_category.sql').toString();
    await db.update(sql, [JSON.parse(productId), JSON.parse(categoryId)]);

    return {
    }
}

async function getSoldProducts() {
    var sql = fs.readFileSync(path + 'sold_products.sql').toString();
    const rows = await db.select(sql);
    return {
        rows
    }
}

module.exports = {
    getAll,
    getByCategory,
    getBySubCategory,
    getById,
    getByName,
    getNames,
    addProduct,
    getAllAdmin,
    putAmount,
    putProduct,
    getSoldProducts
}