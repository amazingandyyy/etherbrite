import React from 'react'
import { NavLink } from 'react-router-dom'

const Layout = (props) => (<div>
  <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Etherbrite</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to="create">Create</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to="register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to="tickets">Tickets</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to="checkin">Checkin</NavLink>
        </li>
        <li className="nav-item">
          <a target="_blank" rel="noopener noreferrer" className="nav-link" href="https://github.com/amazingandyyy/etherbrite">Source</a>
        </li>
      </ul>
    </div>
  </nav>
  {props.children}
  </div>)

export default Layout;