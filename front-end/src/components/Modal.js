import React, { useEffect, useRef, useState } from 'react';
import './Modal.css'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const Modal = ({noteId, text, user_id, user_email, modalState}) => {

    const [solution, setSolution] = useState('');

    const textareaRef = useRef(null);
    useEffect(() => {
         //Mettre le focus sur le textarea lorsque la modal est ouverte
         
             textareaRef.current.focus();
         
    }, []);
  
    
    const handleTextareaChange = (event) => {
        setSolution(event.target.value);
    };

    const handleModalClick = (event) => {
        
        event.stopPropagation();
    };

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            modalState();
        }
    };

    const emailData = {
        to: 'chriselisee02@gmail.com',
        id: noteId,
        problem: text,
        user_id: user_id,
        user_email: user_email,
        solution: solution
    }
    
    const handleSubmit = async (e) => {
          e.preventDefault();
          try {
          const response = await axios.post('http://localhost:3000/helper/send-email', emailData);
          console.log('Email sent successfully:', response.data);
          Swal.fire({
            title:"Succès!",
            text: '',
            icon:'success',
            confirmButtonText: 'Fermer'
          });
           
          } catch (error) {
          console.error('Error sending email:', error.response.data);
            Swal.fire({
                title:"Erreur",
                text: 'Il y a eu un problème la soumission',
                icon:'error',
                confirmButtonText: 'OK'
            });
    
    }
        setSolution('')
    };


  
    return (
        <>

       <div className="modal-overlay" 
       >
                    <div className="modal" 
                     onClick={handleModalClick}
                    >
                        <span className="close" 
                       onClick = {() => modalState()}
                        >&times;</span>
                        <h2 className='modal-title'>Répondre à l'utilisateur : {user_id}</h2>
                        <h4>assistance n. {noteId}</h4>
                         <p> contexte: {text}</p>
                        <textarea 
                            ref={textareaRef}
                            value={solution}
                            onChange={handleTextareaChange}
                            placeholder="Votre message...">

                            </textarea>
                        <div className="modal-buttons">
                            <button className="send" onClick={handleSubmit}>Envoyer</button>
                            <button className="fermer" 
                            onClick = {() => modalState()}
                            >Fermer</button>
                        </div>
                    </div>
                
            
        </div>
        </>
    );
};

export default Modal;