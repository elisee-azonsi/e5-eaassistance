const mysql = require('mysql');
const createUserTable = require('./user-model');
const createText = require('./text-model');
const createSolution = require('./solution-model');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database server:', err);
    return;
  }
  console.log('Connected to MySQL database server');

  
  connection.query('CREATE DATABASE IF NOT EXISTS ea_assistance', (error) => {
    if (error) {
      console.error('Error creating database:', error);
      return;
    }
    console.log('Database "ea_assistance" created');

    
    connection.query('USE ea_assistance', (useError) => {
      if (useError) {
        console.error('Error switching to database:', useError);
        return;
      }
      console.log('Switched to database "ea_assistance"');
      
      
      createUserTable(connection);
      createText(connection);
      createSolution(connection);
      
    });
  });
});

module.exports = connection;
