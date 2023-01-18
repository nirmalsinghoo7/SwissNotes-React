import React from 'react'
import {useLocation, Link, useNavigate} from "react-router-dom"
import PropTypes from 'prop-types';

export const Navbar = (props) => {
  let history = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    history.push('/login');
  }
  let location = useLocation();
  /* useEffect(() => {
   console.log(location.pathname);
  }, [location]); */
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SwissNotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname ==="/" ? "active": ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>:<div><span className='text-white'>User:- {props.name}</span> <Link className="btn btn-danger mx-1" onClick={handleLogout}>Logout</Link></div>}
        </div>
      </div>
    </nav>
    </>
  );
}
Navbar.propTypes = {
  name: PropTypes.any
}
export default Navbar