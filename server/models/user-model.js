// Function to create tables
function createTables(connection){
    // Create users table if it doesn't exist
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        user_surname VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) UNIQUE NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        user_phone_num VARCHAR(20) NOT NULL,
        user_role VARCHAR(50) NOT NULL
      )
    `;
    connection.query(createUserTableQuery, (error) => {
      if (error) {
        console.error('Error creating users table:', error);
        return;
      }
      console.log('Users table created');
    });
  }
  
  module.exports = createTables;
  