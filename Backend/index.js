const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const tbl_admin_p_category=require('./Routes/tbl_admin_p_category')
app.use('/', tbl_admin_p_category);


const tbl_admin_p_sub_category=require('./Routes/tbl_admin_p_sub_category');
app.use('/',tbl_admin_p_sub_category)

const tbl_retailer_products=require('./Routes/tbl_retailer_products');
app.use('/',tbl_retailer_products)

const tbl_retailer_reg=require('./Routes/tbl_retailer_reg');
app.use('/',tbl_retailer_reg)

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
