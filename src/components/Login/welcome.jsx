import React, {Component} from 'react';
import '../App.css';

//import Axios from 'axios' ;


class Welcome extends Component {

    constructor(){
      super();
      this.state={}
      //this.routeChange = this.routeChange.bind(this);
    
}

// routeChange() {
//   let path = `/http://10.150.120.160:8016`;
//   this.props.history.push(path);
// }

updateProfile(){
  //Theta API
  // window.location.replace("http://10.150.176.199:8019/#");
  window.location.assign("http://localhost:8019/#")
}
changePassword(){
  //SouL API
  // window.location.assign("http://10.150.120.183:8016/#")
  window.location.assign("http://localhost:8016/#")
}

render()
{
  return (
   // console.log(this.props.userData),
    
   <div className="text-center">
      <h1 className="text-center">Welcome Page</h1>
      <br/>
      <br/>
      <hr/>
     
      <button onClick={this.updateProfile}>Update profile</button>
      <br/>
      <br/>
      {/* <a href="http://localhost:8019">Update Profile</a> */}
      <button onClick={this.changePassword} >Change Password</button>
      
    </div>   
  )
}
}
export default Welcome