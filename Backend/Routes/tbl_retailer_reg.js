const express = require('express');
const tbl_retailer_reg_router = express.Router();
const { tbl_retailer_reg_get, tbl_retailer_reg_post, tbl_retailer_reg_put, tbl_retailer_reg_delete } = require('../Controllers/tbl_retailer_reg');

tbl_retailer_reg_router.post('/api/retailer', tbl_retailer_reg_post);

tbl_retailer_reg_router.get('/api/retailers', tbl_retailer_reg_get);

tbl_retailer_reg_router.put('/api/retailer/:retid', tbl_retailer_reg_put);

tbl_retailer_reg_router.delete('/api/retailer/:retid', tbl_retailer_reg_delete);

module.exports = tbl_retailer_reg_router;
