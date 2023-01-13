import React, { useState } from 'react';
import NoteContext from "./noteContext";
import PropTypes from 'prop-types'

const NoteState = (props) => {
  //const {children} = props;
  const s1 = {
    "name": "Nirmal",
    "class": "React"
  }
  const [state, setState] = useState(s1);
  const update = () =>{
    setTimeout(() => {
      setState({
        "name": "Singh",
        "class": "NextJS"
      }, 5000);
    })
  }
  return(
    <NoteContext.Provider value={{state, update}}>
      {props.children}
    </NoteContext.Provider>
  )

}

NoteState.propTypes = {
  children: PropTypes.string
}
export default NoteState;