const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let tbl_retailer_reg_get = async (req, res) => {
    let sqlQuery = "SELECT * FROM tbl_retailer_reg";
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
const tbl_retailer_reg_post = (req, res) => {
    const { retid, retregno, retname, contactno, alternatecontact, address, state, city, pincode, email, url, pan, password, status, registeron } = req.body;

    console.log('Request Body:', req.body);

    if (!retid || !retregno || !retname || !contactno || !alternatecontact || !address || !state || !city || !pincode || !email || !url || !pan || !password || !status) {
       return res.status(400).send('All fields (retid, retregno, retname, contactno, alternatecontact, address, state, city, pincode, email, url, pan, password, status) are required');
    }

    const sqlQuery = `
       INSERT INTO tbl_retailer_reg (retid, retregno, retname, contactno, alternatecontact, address, state, city, pincode, email, url, pan, password, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;
    const values = [retid, retregno, retname, contactno, alternatecontact, address, state, city, pincode, email, url, pan, password, status];

    pool.query(sqlQuery, values, (err, result) => {
       if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).send('Error inserting data');
       }
       console.log('Data inserted successfully');
       res.send({ success: true, message: 'Retailer added successfully' });
    });
};
 
//!---------------------------------->PUT<-------------------------------//

const tbl_retailer_reg_put = (req, res) => {
    const retid = req.params.retid; 
    const { retname, contactno } = req.body; 

    if (!retname || !contactno) {
      return res.status(400).send('Fields retname and contactno are required');
    }

    // Validate length based on column constraints
    if (retname.length > 50) {
        return res.status(400).send('retname is too long');
    }
    if (contactno.length > 15) {
        return res.status(400).send('contactno is too long');
    }

    let sqlQuery = `
      UPDATE tbl_retailer_reg SET retname = $1, contactno = $2 WHERE retid = $3
    `;
    let values = [retname, contactno, retid]; 

    pool.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).send('Error updating data: ' + err.message);
      }
      console.log('Data updated successfully');
      res.send({ success: true, message: 'Retailer updated successfully' });
    });
};


//!---------------------------------->DELETE<-------------------------------//

const tbl_retailer_reg_delete = async (req, res) => {
    const retid = req.params.retid;
    const sqlQuery = 'DELETE FROM tbl_retailer_reg WHERE retid = $1';

    pool.query(sqlQuery, [retid], (err, result) => {
      if (err) {
        console.log('Error deleting record:', err);
        return res.status(500).send({ error: 'Error deleting record', details: err });
      }
      if (result.rowCount === 0) {
        return res.status(404).send({ message: 'No record found with the given retid' });
      }
      console.log('Record deleted successfully');
      res.status(200).send({ message: 'Record deleted successfully' });
    });
};

module.exports = { tbl_retailer_reg_get, tbl_retailer_reg_post, tbl_retailer_reg_put, tbl_retailer_reg_delete };
