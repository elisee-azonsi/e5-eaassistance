import Note from "./Note";
import React, { useState } from "react";
import axios from "axios";


const ListNotes = ({ note, searchQuery, handleAddNote, handleDeleteNote }) => {

    const [noteID, setNoteID] = useState([]);

    const deleteNote = async(id) => {
        
        const response = await axios.post('http://localhost:3000/text/delete', {text_id:id},{withCredentials:true});
        
        if(response.status === 201){
            setNoteID(arr => [...arr, id]);
        }else{
            alert('Error')
        }

        console.log(response);
    }

    const filteredNotes = note.filter((note) => {
        const query = searchQuery.toLowerCase();
        return (
            note.text_problem.toLowerCase().includes(query) ||
            note.text_content.toLowerCase().includes(query) ||
            note.user_email.toLowerCase().includes(query)
        );
    });

    const updatedNotes = filteredNotes.filter((note) => {
        return (
            !noteID.includes(note.text_id)
        )
    })

    console.log(updatedNotes)


    return (
        <div className="notes-list">
            {updatedNotes.map((note) => (
                <Note
                    id={note.text_id}
                    text={note.text_problem}
                    content={note.text_content}
                    handleDeleteNote={deleteNote}
                    user_id={note.user_id}
                    user_email={note.user_email}
                />
            ))}

        </div>)
};

export default ListNotes;