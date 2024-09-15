const pool = require('../Model/Model'); 

//!--------------------------------->GET<-------------------------------//

let tbl_admin_p_sub_category_get = async (req, res) => {
    let sqlQuery = "SELECT * FROM tbl_admin_p_sub_category";
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
const tbl_admin_p_sub_category_post = (req, res) => {
  const { catid, sub_catid, sub_catname,addedon } = req.body;

  
  console.log('Request Body:', req.body);

  if ( !catid || !sub_catid || !sub_catname ) {
     return res.status(400).send('All fields ( catid, sub_catid, sub_catname,addedon ) are required');
  }

  const sqlQuery = `
     insert into tbl_admin_p_sub_category(catid, sub_catid, sub_catname) values($1,$2,$3);
  `;
  const values = [ catid, sub_catid, sub_catname];

  pool.query(sqlQuery, values, (err, result) => {
     if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data');
     }
     console.log('Data inserted successfully');
     res.send({ success: true, message: 'sub Category added successfully' });
  });
};

//!---------------------------------->PUT<-------------------------------//
const tbl_admin_p_sub_category_put = (req, res) => {
  const sub_catid = req.params.sub_catid; 
  const { catid, sub_catname } = req.body; 

  // Check if required fields are present
  if (!catid || !sub_catname) {
    return res.status(400).send('Fields catid and sub_catname are required');
  }

  // Update query
  const query = `
    UPDATE tbl_admin_p_sub_category
    SET catid = $1, sub_catname = $2
    WHERE sub_catid = $3
    RETURNING *;
  `;

  // Set correct values in the same order as query placeholders
  let values = [catid, sub_catname, sub_catid]; 

  // Use 'query' instead of 'sqlQuery'
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Error updating data: ' + err.message);
    }

    console.log('Data updated successfully');
    res.send({ success: true, message: 'Sub Category updated successfully', data: result.rows[0] });
  });
};


//!---------------------------------->DELETE<-------------------------------//

const tbl_admin_p_sub_category_delete = async (req, res) => {
    const sub_catid = req.params.sub_catid;
    const sqlQuery = 'DELETE FROM tbl_admin_p_sub_category WHERE sub_catid = $1';

    pool.query(sqlQuery, [sub_catid], (err, result) => {
      if (err) {
        console.log('Error deleting record:', err);
        return res.status(500).send({ error: 'Error deleting record', details: err });
      }
      if (result.rowCount === 0) {
        return res.status(404).send({ message: 'No record found with the given sub_catid' });
      }
      console.log('Record deleted successfully');
      res.status(200).send({ message: 'Record deleted successfully' });
    });
};

module.exports = { tbl_admin_p_sub_category_get, tbl_admin_p_sub_category_post, tbl_admin_p_sub_category_put, tbl_admin_p_sub_category_delete };
