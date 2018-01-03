import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

class Layout extends React.Component {
  activePath(p){
    const path = this.context.router.route.location.pathname.split('/')[1];
    return path==p?'nav-link active':'nav-link';
  }
  render() {
    return (<div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Etherbrite</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={this.activePath('create')} to="create">Create</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={this.activePath('register')} to="register">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={this.activePath('tickets')} to="tickets">Tickets</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={this.activePath('checkin')} to="checkin">Checkin</NavLink>
            </li>
            <li className="nav-item">
              <a target="_blank" rel="noopener noreferrer" className="nav-link" href="https://github.com/amazingandyyy/etherbrite">Source</a>
            </li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      </div>)
  }
}

Layout.contextTypes = {
  router: PropTypes.object
}

export default Layout;