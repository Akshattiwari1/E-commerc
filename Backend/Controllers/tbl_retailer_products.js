const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let tbl_retailer_products_get = async (req, res) => {
    let sqlQuery = "SELECT * FROM tbl_retailer_products";
    pool.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).send('Error executing query');
      } else {
        res.send(result.rows);
      }
    });
};
  
//!---------------------------------->POST<-------------------------------//
const tbl_retailer_products_post = (req, res) => {
  const { sub_catid, retid, pid, productname, price, qty, company,updatedon } = req.body;

  if (!sub_catid || !retid || !pid || !productname || !price || !qty || !company) {
    return res.status(400).send('All fields (sub_catid, retid, pid, productname, price, qty, company) are required');
  }

  const sqlQuery = `
    INSERT INTO tbl_retailer_products (sub_catid, retid, pid, productname, price, qty, company)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const values = [sub_catid, retid, pid, productname, price, qty, company];

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    console.log('Data inserted successfully');
    res.send({ success: true, message: 'Product added successfully' });
  });
};

 
//!---------------------------------->PUT<-------------------------------//
const tbl_retailer_products_put = (req, res) => {
    const pid = req.params.pid;  // Assuming you are updating based on pid
    const { sub_catid, retid, productname, price, qty, company, updatedon } = req.body; 

    // Ensure you include the updatedon field if necessary
    let sqlQuery = `
      UPDATE tbl_retailer_products 
      SET sub_catid = $1, retid = $2, productname = $3, price = $4, qty = $5, company = $6, updatedon = $7 
      WHERE pid = $8`;
    
    let values = [sub_catid, retid, productname, price, qty, company, updatedon, pid]; 

    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).send('Error updating data: ' + err.message);
      }
      console.log('Data updated successfully');
      res.send({ success: true, message: 'Product updated successfully' });
    });
};


//!---------------------------------->DELETE<-------------------------------//

const tbl_retailer_products_delete = async (req, res) => {
    const catid = req.params.catid;
    const sqlQuery = 'DELETE FROM tbl_retailer_products WHERE pid = $1';

    pool.query(sqlQuery, [catid], (err, result) => {
      if (err) {
        console.log('Error deleting record:', err);
        return res.status(500).send({ error: 'Error deleting record', details: err });
      }
      if (result.rowCount === 0) {
        return res.status(404).send({ message: 'No record found with the given catid' });
      }
      console.log('Record deleted successfully');
      res.status(200).send({ message: 'Record deleted successfully' });
    });
};

module.exports = { tbl_retailer_products_get, tbl_retailer_products_post, tbl_retailer_products_put, tbl_retailer_products_delete };
