import React, { useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
   a.update();
   // eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      <div>The is {a.state.name} and he in class {a.state.class}</div>
    </div>

  )
}

export default About