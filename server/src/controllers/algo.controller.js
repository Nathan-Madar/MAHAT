const salesService = require('../services/sales.service');
const productsService = require('../services/products.service');

// Use linear regression to determine when the amount in stock will reach 0
function reachZeroInDays(transactions) {
    let amountOfTransactions = transactions.length;
    let sumOfDaysSquare = 0;
    let sumOfStock = 0;
    let sumOfStockMulDay = 0;
    let totalDaysSquare = 0;

    for (let i = 0; i < amountOfTransactions; i++) {
        sumOfDaysSquare += parseInt(transactions[i].days);
        sumOfStock += parseInt(transactions[i].stock);
        sumOfStockMulDay += (parseInt(transactions[i].days) * parseInt(transactions[i].stock));
        totalDaysSquare += (parseInt(transactions[i].days) * parseInt(transactions[i].days));
    }

    let slope = (amountOfTransactions * sumOfStockMulDay - sumOfDaysSquare * sumOfStock) / (amountOfTransactions * totalDaysSquare - sumOfDaysSquare * sumOfDaysSquare);

    let intercept_y = (sumOfStock - slope * sumOfDaysSquare) / amountOfTransactions;
    return Math.floor(-intercept_y / slope);
}

async function mostNeededRestock() {
    let products = await productsService.getSoldProducts()
    products = products.rows

    let product = null;

    for (let i = 0; i < products.length; i++) {
        let productDetails = await salesService.getStockPerDay(products[i].id)
        let daysToRestock = reachZeroInDays(productDetails.rows)
        if (product === null || product.daysToResock >= daysToRestock) {
            product = products[i];
            product['daysToResock'] = daysToRestock
        }

    }
    
    return product
}

async function getProductToRestock(req, res, next) {
    try {
        res.json(await mostNeededRestock());
    } catch (err) {
        console.error(`Error while calculating most needed restock`, err.message);
        next(err);
    }
}


module.exports = {
    getProductToRestock
};