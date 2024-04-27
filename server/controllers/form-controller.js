const connection = require('../models/config'); // Update the path as per your project structure
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const addText = async(req,res) => {
  const { user_id, text_content, user_email, text_problem } = req.body;

  const insertTextQuery = 'INSERT INTO user_texts (user_id, text_content, text_problem, user_email) VALUES (?, ?, ?, ?)';
  
  connection.query(insertTextQuery, [user_id,text_content, text_problem, user_email], (insertErr, result) => {
    if (insertErr) {
      console.error('Error inserting text data:', insertErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('User registered successfully');
    res.status(201).json({ message: 'Text is added successfully' });
  });

}

const updateText = (req,res) => {

  const { text_id, text_content } = req.body;
  

  const updateTextQuery = 'UPDATE user_texts SET text_content = ? WHERE text_id = ?';
  
  connection.query(updateTextQuery, [text_content,text_id], (updateErr, result) => {
    if (updateErr) {
      console.error('Error updating text data:', insertErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
   // console.log('User registered successfully');
    res.status(201).json({ message: 'Text is updated successfully' });
  });

  
}

const deleteText = (req,res) => {

  const { text_id } = req.body;
  

  const deleteTextQuery = 'DELETE FROM user_texts WHERE text_id = ?';
  
  connection.query(deleteTextQuery, [text_id], (deleteErr, result) => {
    if (deleteErr) {
      console.error('Error deleting text data:', insertErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
   // console.log('User registered successfully');
    res.status(201).json({ message: 'Text is deleted successfully' });
  });

  
}
const getNotes = (req, res) => {
  
  const getNotesQuery = 'SELECT * FROM user_texts;';
  
  connection.query(getNotesQuery, (getErr, result) => {
    if (getErr) {
      console.error('Error getting text:', getErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
   
    res.status(201).json(result);
  });

  
}



module.exports = { addText, updateText, deleteText, getNotes };