import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history("/login")
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({id:"", utitle: "", udescription: "", utag: ""})
  const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag})
  }
  const handleClick = () =>{
    editNote(note.id, note.utitle, note.udescription, note.etag)
    refClose.current.click();
       props.showAlert("Note Updated Successfully","info");
     // alert("Updated Successfully");
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-3">
                  <label htmlFor="utitle" className="form-label">Title</label>
                  <input type="text" name="utitle" className="form-control" id="utitle" aria-describedby="emailHelp" value={note.utitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">Description</label>
                  <input type="text" value={note.udescription} name="udescription" className="form-control" id="udescription" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="utag" className="form-label">Tag</label>
                  <input type="text" value={note.utag} name="utag" className="form-control" id="utag" onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.utitle.length<5 || note.udescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container mx-1">{notes.length === 0 && "No notes to display"}</div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};
Notes.propTypes = {
  showAlert: PropTypes.any,
  count: PropTypes.any,
  setCount: PropTypes.any
}

export default Notes;