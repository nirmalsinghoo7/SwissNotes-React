import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""})
  let history = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json)

    if(json.success){
      // Save the auth toke and redirect
      setCredentials({email:"", password:""})
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Logged in successfully", "success");
      history("/");

    }else{
      props.showAlert("Invalid details", "danger")

    }

  }
  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div>
    <h2 className='mt-2'>Login to continue to SwissNotes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
Login.propTypes = {
  showAlert: PropTypes.any
}
export default Login