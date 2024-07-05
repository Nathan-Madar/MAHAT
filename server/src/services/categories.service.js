var fs = require('fs');
const db = require('./db.service');

const path = './src/services/SQL/categories/'

async function getCategories() {
    var sql = fs.readFileSync(path + 'categories.sql').toString();
    const rows = await db.select(sql, []);
    return {
        rows
    }
}

async function getSubCategories() {
    var sql = fs.readFileSync(path + 'sub_categories.sql').toString();
    const rows = await db.select(sql, []);
    return {
        rows
    }
}

module.exports = {
    getCategories,
    getSubCategories
}