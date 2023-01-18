import React, {useState} from 'react';
import NoteContext from "./noteContext";
import PropTypes from 'prop-types'

const NoteState = (props) => {
  const host = "http://localhost:4000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Get all notes
  const getNotes = async () =>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  // Add a Note
  /* eslint-disable no-unused-vars */
  const addNote = async (title, description, tag) =>{
    /* eslint-enable no-unused-vars */
    console.log('Adding new note');
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))

  }
  // Delete a note
  const deleteNote = async (id) =>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json = await response.json()
    //console.log(json);

   //console.log('Deleting the note with id' + id);
    const newNotes = notes.filter((note=> {return note._id!==id}));
    setNotes(newNotes);
  }

  /* const deleteNote = (id) =>{

    console.log('Deleting the note with id' + id);
    const newNotes = notes.filter((note=> {return note._id!==id}));
    setNotes(newNotes);
  }
 */

  // Edit a note
  const editNote = async(id, title, description, tag) =>{
   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return(
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      <div>{props.children}</div>
    </NoteContext.Provider>
  )
}

 NoteState.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  tag: PropTypes.any,
  note: PropTypes.any,
  children: PropTypes.any
}

export default NoteState;