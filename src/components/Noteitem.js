import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import PropTypes from 'prop-types'

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
          <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="card-title">{note.title}</h4>
            <div className="float-right"><i className="far fa-trash-alt mx-2 text-danger" onClick={()=>{deleteNote(note._id);  props.showAlert("Note Deleted Successfully","warning");}}></i>
            <i className="far fa-edit mx-2 text-warning" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>
            <span className="badge bg-primary mb-2"><i className="fas fa-tags"></i> {note.tag}</span>
            <p className="card-text">{note.description}</p>
          </div>
      </div>
  </div>
  )
}
Noteitem.propTypes = {
  note: PropTypes.any,
  description: PropTypes.any,
  updateNote: PropTypes.any,
  title: PropTypes.any,
  tag: PropTypes.any,
  showAlert: PropTypes.any
}
export default Noteitem