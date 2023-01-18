
import React, { useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";
import PropTypes from 'prop-types'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
     props.showAlert("Note Added Successfully","success");

  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className='yt-3'>
      <h1>Add a Note</h1>
        <form>
          <div className="my-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" className="form-control" value={note.title} id="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" name="description" className="form-control" value={note.description} id="description" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" name="tag" className="form-control" value={note.tag} id="tag" onChange={onChange} />
          </div>

          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
        </form>
      </div>

  )
}
AddNote.propTypes = {
  note: PropTypes.any,
  addNote: PropTypes.any,
  showAlert: PropTypes.any

}
export default AddNote
