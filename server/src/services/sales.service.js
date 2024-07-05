var fs = require('fs');
const db = require('./db.service');

const path = './src/services/SQL/sales/'

async function postSale(
    customersName,
    customersPhone,
    customersEmail,
    totalPrice,
    description,
    paymentMethod,
    soldOnline,
    discountOnSaleId,
    customersCountry,
    customersCity,
    customersZip,
    customersAddress,
    productReceived
) {
    var sql = fs.readFileSync(path + 'sale.sql').toString();
    const saleId = await db.insertOne(sql, [
        customersName,
        customersPhone,
        customersEmail,
        JSON.parse(totalPrice),
        description,
        paymentMethod,
        JSON.parse(soldOnline),
        JSON.parse(discountOnSaleId),
        customersCountry,
        customersCity,
        customersZip,
        customersAddress,
        JSON.parse(productReceived)
    ]);
    return {
        saleId
    }
}

async function postSaleItems(saleId, productId, quantitySold, sellingPriceAtTime, discountId) {
    var sql = fs.readFileSync(path + 'add_sale_item.sql').toString();
    const rows = await db.insertOne(sql, [
        saleId,
        JSON.parse(productId),
        JSON.parse(quantitySold),
        JSON.parse(sellingPriceAtTime),
        JSON.parse(discountId)
    ]);
    return {
        rows
    }
}

async function putProductAmount(productId, quantitySold) {
    var sql = fs.readFileSync(path + 'sub_quantity.sql').toString();
    const rows = await db.update(sql, [quantitySold, productId]);
    return {
        rows
    }
}

async function postSaleDetails(
    customersName,
    customersPhone,
    customersEmail,
    totalPrice,
    description,
    paymentMethod,
    soldOnline,
    discountOnSaleId,
    customersCountry,
    customersCity,
    customersZip,
    customersAddress,
    productReceived,
    products
) {
    let saleId = (await postSale(
        customersName,
        customersPhone,
        customersEmail,
        totalPrice,
        description,
        paymentMethod,
        soldOnline,
        discountOnSaleId,
        customersCountry,
        customersCity,
        customersZip,
        customersAddress,
        productReceived
    )).saleId
    JSON.parse(products).forEach(async product => {
        await postSaleItems(saleId, product.id, product.quantity, product.sellingPrice, product.discountId)
        await putProductAmount(product.id, product.quantity)
    });

    return {

    }
}

async function getAllSales() {
    var sql = fs.readFileSync(path + 'all.sql').toString();
    const rows = await db.select(sql);


    for (let row of rows) {
        let saleId = row.id
        let saleSql = fs.readFileSync(path + 'sale_items.sql').toString();
        let products = await db.select(saleSql, [saleId]);
        row['products'] = products
    }

    return {
        rows
    }
}

async function putHandleSale(saleId) {
    var sql = fs.readFileSync(path + 'handled.sql').toString();
    const rows = await db.update(sql, [saleId]);
    return {
        rows
    }
}

async function getStockPerDay(id) {
    var sql = fs.readFileSync(path + 'stock_per_day.sql').toString();
    const rows = await db.select(sql, [id]);

    return {
        rows
    }
}

module.exports = {
    postSaleDetails,
    getAllSales,
    putHandleSale,
    getStockPerDay
}