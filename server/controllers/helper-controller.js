const connection = require('../models/config');
const nodemailer = require('nodemailer');
const express = require('express');
// Créer un transporteur SMTP réutilisable

const sendEmail = async (req, res) => {
    const { to, id, problem, solution, user_id, user_email } = req.body;
    
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chriazo01@gmail.com', 
            pass: 'xcomyehtfoeycsqm'
        },
        tls: {
            rejectUnauthorized: false
            }
    });

       let info =  await transporter.sendMail({
            from: 'chriazo01@gmail.com',
            to: to,
            subject: 'Solution pour la note ' + id,
            text: `ID de la note: ${id}\n Problème: ${problem}\nSolution: ${solution}`
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Email sent successfully');
        const query = `INSERT INTO solutions (solution_id, user_id, user_email, text_problem, text_solution) VALUES (?, ?, ?, ?, ?)`;
        connection.query(query, [id, user_id, user_email, problem, solution], (err, result) => {
            if (err) {
                console.error('Error storing data into database:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Data stored into database');
            res.send('Email sent successfully and data stored into database');
        });
    } 

module.exports = {sendEmail};

