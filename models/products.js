const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const products = [];

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json');

const fetchAllProductList = (cb) => {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                console.log(err)
                cb([]);
            }else{
                cb(JSON.parse(fileContent));
            }
        });
    }

module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save() {
        // const p = path.join (path.dirname(require.main.filename), 'data', 'products.json');
        // products.push(this);
        fetchAllProductList( (products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('error occured')
                console.log(err);
            });
        })
    }

    static fetchall(cb) {
        fetchAllProductList(cb)
    }
}
// 1296000