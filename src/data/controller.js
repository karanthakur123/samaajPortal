const pool = require('../../db'); 

const getUserData= async (req,res)=>{
    pool.query("select * from users",(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}


const createUserData= async (req,res)=>{

     try {
        const { username, email } = req.body;
    
        // SQL query to insert data into a table called "users"
        const query = `
         INSERT INTO users (username, email)
          VALUES ($1, $2)
          RETURNING *
        `;
    
        // Parameters for the SQL query
        const values = [username, email];
    
        // Execute the query
        const result = await pool.query(query, values);
    
        // Send the inserted data back as the response
        res.json(result.rows[0]);
      } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'An error occurred while inserting data' });
      }
}


    const editUserData= async (req,res)=>{
    try {
      const { id } = req.params;
      const { username, email } = req.body;
  
      // SQL query to update user data in the "users" table
      const query = `
        UPDATE users
        SET username = $1, email = $2
        WHERE id = $3
        RETURNING *
      `;
  
      // Parameters for the SQL query
      const values = [username, email, id];
  
      // Execute the query
      const result = await pool.query(query, values);
  
      // Check if user with the given ID exists
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the updated user data back as the response
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'An error occurred while updating user' });
    }
}


  const deleteUserData= async (req,res)=>{    try {
      const { id } = req.params;
  
      // SQL query to delete user data from the "users" table
      const query = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
      `;
  
      // Parameters for the SQL query
      const values = [id];
  
      // Execute the query
      const result = await pool.query(query, values);
  
      // Check if user with the given ID exists
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send a success message back as the response
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'An error occurred while deleting user' });
    }
}



module.exports={
    getUserData,
    createUserData,
    editUserData,
    deleteUserData
}