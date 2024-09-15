const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let tbl_admin_p_category_get = async (req, res) => {
    let sqlQuery = "SELECT * FROM tbl_admin_p_category";
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
const tbl_admin_p_category_post = (req, res) => {
  const { catid, catname } = req.body;

  console.log('Request Body:', req.body);

  if (!catid || !catname) {
     return res.status(400).send('All fields (catid, catname) are required');
  }

  const sqlQuery = `
     INSERT INTO tbl_admin_p_category (catid, catname)
     VALUES ($1, $2)
  `;
  const values = [catid, catname];

  pool.query(sqlQuery, values, (err, result) => {
     if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data');
     }
     console.log('Data inserted successfully');
     res.send({ success: true, message: 'Category added successfully' });
  });
};

 
//!---------------------------------->PUT<-------------------------------//

const tbl_admin_p_category_put = (req, res) => {
  const catid = req.params.catid; 
  const { catname } = req.body; 

  // Validate required fields
  if (!catname ) {
    return res.status(400).send('Fields catname and startdate are required');
  }

  const sqlQuery = `
    UPDATE tbl_admin_p_category 
    SET catname = $1
    WHERE catid = $2`;
  
  const values = [catname,  catid]; 

  pool.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }
    console.log('Data updated successfully');
    res.send({ success: true, message: 'Category updated successfully' });
  });
};


//!---------------------------------->DELETE<-------------------------------//

const tbl_admin_p_category_delete = async (req, res) => {
    const catid = req.params.catid;
    const sqlQuery = 'DELETE FROM tbl_admin_p_category WHERE catid = $1';

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

module.exports = { tbl_admin_p_category_get, tbl_admin_p_category_post, tbl_admin_p_category_put, tbl_admin_p_category_delete };
