var fs = require('fs');
const db = require('./db.service');

const path = './src/services/SQL/discounts/'

async function getAll() {
    var sql = fs.readFileSync(path + 'all.sql').toString();
    const rows = await db.select(sql);
    return {
        rows
    }
}

async function postDiscount(name, description, percent) {
    var sql = fs.readFileSync(path + 'add.sql').toString();

    const rows = await db.insertOne(sql, [name, description, JSON.parse(percent)]);

    return {
        rows
    }
}

async function putDiscount(discount_id, name, description, percent) {
    var sql = fs.readFileSync(path + 'update.sql').toString();

    await db.update(sql, [
        JSON.parse(discount_id),
        name,
        description,
        JSON.parse(percent),
    ]);

    return {
    }
}

async function deleteDiscount(discount_id) {
    var sql = fs.readFileSync(path + 'delete.sql').toString();

    await db.update(sql, [JSON.parse(discount_id)]);

    return {
    }
}

module.exports = {
    getAll,
    postDiscount,
    putDiscount,
    deleteDiscount
}