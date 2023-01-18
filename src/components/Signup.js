import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let history = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(credentials.password === credentials.cpassword){
      const {name, email, password} = credentials;
      const response = await fetch("http://localhost:4000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
        // Save the auth toke and redirect
        localStorage.setItem('token', json.authtoken)
        props.showAlert("Account created successfully","success");
        history("/");
      }else{
        props.showAlert("Invalid Credentials","danger")
      }
    }
    else{
      props.showAlert("Confirm Password does not match","danger")
    }
  }
  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className='container'>
    <h2 className='mt-2'>Signup to use to SwissNotes</h2>
     <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} id="name" name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}
Signup.propTypes = {
  showAlert: PropTypes.any
}
export default Signup
