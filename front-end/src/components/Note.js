import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Modal from './Modal.js';
import './button.css'

const Note = ({id, user_id, text, content, handleDeleteNote, user_email}) => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
        console.log(showModal);
    };

    return (
        <>
            <div className="note">
                <span className="problem">{text}</span>
                <p>{content}</p>
                <div className="note-footer">
                    <MdDeleteForever 
                        onClick={() => handleDeleteNote(id)}
                        className="delete-icon"
                        size="1.3em"
                    />
                    <button className="button" onClick={toggleModal}> Voir Plus</button>
                </div>
            </div>

            {showModal && (
                <Modal 
                    noteId={id} 
                    text={text} 
                    user_id={user_id} 
                    user_email={user_email} 
                    modalState={toggleModal} 
                />
            )}
        </>
    );
};

export default Note;
