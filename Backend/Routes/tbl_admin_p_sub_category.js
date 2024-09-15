const express = require('express');
const tbl_admin_p_sub_category_router = express.Router();
const { tbl_admin_p_sub_category_get, tbl_admin_p_sub_category_post, tbl_admin_p_sub_category_put, tbl_admin_p_sub_category_delete } = require('../Controllers/tbl_admin_p_sub_category');

tbl_admin_p_sub_category_router.post('/api/sub_category_post', tbl_admin_p_sub_category_post);

tbl_admin_p_sub_category_router.get('/api/sub_category_get', tbl_admin_p_sub_category_get);

tbl_admin_p_sub_category_router.put('/api/sub_category_put/:sub_catid', tbl_admin_p_sub_category_put);

tbl_admin_p_sub_category_router.delete('/api/sub_category_delete/:sub_catid', tbl_admin_p_sub_category_delete);

module.exports = tbl_admin_p_sub_category_router;
