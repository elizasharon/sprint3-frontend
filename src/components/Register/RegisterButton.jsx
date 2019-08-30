/**
  * 1990-2019 Publicis Sapient Corporation. All rights reserved.   
*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class RegisterButton extends Component {
  
  // by clicking this button he will go to the registration page
  render() {
    return (
      <div>
        <br /><br />
        <Link to="/register">
          <button className="btn btn-primary"> Register</button></Link>
      </div>
    )
  }
}
