function createSolution(connection){
    // Create users table if it doesn't exist
    const createSolutionTableQuery = `
    
    CREATE TABLE IF NOT EXISTS solutions (
        solution_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        user_email VARCHAR(255) NOT NULL,
        text_problem TEXT NOT NULL,
        text_solution TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
    `;
    connection.query(createSolutionTableQuery, (error) => {
      if (error) {
        console.error('Error creating text table:', error);
        return;
      }
      console.log('Text table created');
    });
  }
  
  module.exports = createSolution;
  




