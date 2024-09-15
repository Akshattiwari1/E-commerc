const express = require('express');
const router = express.Router();
const {
    tbl_retailer_products_get,
    tbl_retailer_products_post,
    tbl_retailer_products_put,
    tbl_retailer_products_delete
} = require('../Controllers/tbl_retailer_products');

// Define routes
router.get('/retailer-pructsod', tbl_retailer_products_get);
router.post('/retailer-products', tbl_retailer_products_post);
router.put('/retailer-products/:pid', tbl_retailer_products_put);
router.delete('/retailer-products/:pid', tbl_retailer_products_delete);

module.exports = router;
