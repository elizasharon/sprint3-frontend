/**
  * 1990-2019 Publicis Sapient Corporation. All rights reserved.   
*/

import React, { Component } from 'react'
import RegistrationPage from './RegistrationPage';

// If user already exists this will be called
class Error extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render() {
    return (
      <div>
        <h1>User Already Exists</h1>
        <br/><br/>
        <RegistrationPage/>
      </div>
    )
  }
}

export default Error;