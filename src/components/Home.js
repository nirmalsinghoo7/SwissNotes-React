import React from 'react'
import PropTypes from 'prop-types'
import Notes from './Notes';

export const Home = (props) => {
  const {showAlert} = props;
  return (
    <>
      <Notes showAlert={showAlert}/>
    </>
  )
}

Home.propTypes = {
  showAlert: PropTypes.string
}
export default Home
