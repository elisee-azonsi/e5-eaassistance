function createRDV(connection){
    // Create users table if it doesn't exist
    const createTextTableQuery = `
    
    CREATE TABLE IF NOT EXISTS user_texts (
      text_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      user_email VARCHAR(255) NOT NULL,
      text_problem TEXT NOT NULL,
      text_content TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
  );
    `;
    connection.query(createTextTableQuery, (error) => {
      if (error) {
        console.error('Error creating text table:', error);
        return;
      }
      console.log('Text table created');
    });
  }
  
  module.exports = createRDV;
  




