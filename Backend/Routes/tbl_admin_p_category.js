const express = require('express');
const tbl_admin_p_category_router = express.Router();
const { tbl_admin_p_category_get, tbl_admin_p_category_post, tbl_admin_p_category_put, tbl_admin_p_category_delete } = require('../Controllers/tbl_admin_p_category');

tbl_admin_p_category_router.post('/api/category_post', tbl_admin_p_category_post);

tbl_admin_p_category_router.get('/api/category_get', tbl_admin_p_category_get);

tbl_admin_p_category_router.put('/api/category_put/:catid', tbl_admin_p_category_put);

tbl_admin_p_category_router.delete('/api/category_delete/:catid', tbl_admin_p_category_delete);

module.exports = tbl_admin_p_category_router;
