import ListNotes from './ListNotes';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Search from './Search';
import Header from './Header';
import axios from 'axios';

const Notes = () => {
  const[notes, setNotes] = useState([]);

const [searchText, setSearchText] = useState('');

const handleSearchText= (data) => {
  setSearchText(data)
  console.log(data)
  }

useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
);

  if(savedNotes){
    setNotes(savedNotes);
  }

}, [])

const fetchData = async () => {
  try {
    // Crée une requet GET avec Axios
    const response = await axios.get('http://localhost:3000/text/getNotes');
    
    setNotes(response.data);
    
    console.log(response.data);
    
  } catch (error) {
    
    console.log(error);

  }
};

useEffect (() =>{
  fetchData();
}, [])

const addNote = (text) =>{
  const date = new Date();
  const newNote = {
    id:nanoid(),
    text: text,
    date: date.toLocaleDateString()
  }
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
  localStorage.setItem(
    'react-notes-app-data', 
    JSON.stringify(newNotes)
  );
}

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    console.log(newNotes);
    setNotes(newNotes);
  }

  return(
    <div className="container">
      <Header/>
      <Search handleSearchNote={handleSearchText}/>
      <ListNotes 
        note= {notes}
        searchQuery = {searchText}
        handleAddNote= {addNote}
        handleDeleteNote = {deleteNote}
      />        
    </div>
  )
};

export default Notes;