import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from './Axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DeregisterButton extends Component {

    constructor(props) {
        super(props);

        this.state={
            display:false,
            clicked:false,
            operation:"",
            showmodel:false,
            deregistertype:"",

            userdata :{
              userId :this.props.state.userId, 
              password :""
            }
          
        }
        console.log("Const")
        console.log(this.props);
        console.log(this.props.match.params.id);


    }   

    updateProfile=()=>{
      //Theta API
      // window.location.replace("http://10.150.176.199:8019/#");
      //window.location.assign("http://localhost:8019/#")
      this.props.history.push('/update');
     }
     changePassword=()=>{
      //SouL API
      // window.location.assign("http://10.150.120.183:8016/#")
     // window.location.assign("http://localhost:8016/#")
     this.props.history.push('/change');
     }

     displayReviews = () =>{
      //  window.location.assign("http://localhost:8008/#/reviews")
      this.props.history.push('/reviews');
     }
    DeregisterEventHandler = () => {
     
        this.setState({
            display:!this.state.display,
            clicked:false
        })
        
       
      }
      onClickPasswordCheck =(e)=>{
       
        this.setState({error:{...this.state,submitClicked:!this.state.submitClicked}});
       
        console.log(this.state.userdata.userId)
        console.log(this.state.deregistertype)
        var temp = this.state.deregistertype;
        if(temp === 'deactivate'){
              console.log("here")
          
              Axios.auth.postDeregister("/deactivate",this.state.userdata)
             .then(response => {
               console.log(response);
               if (response.data.status === 400) {
                   console.log(response.data.message);          
                 document.getElementById("a1").innerText="Incorrect";
              }
              else if (response.data.status === 200) {
                 this.setState({showModal: false});
                 window.location.replace("http://localhost:8008/#/deactivateSuccess")
                 window.location.reload("http://localhost:8008/#/deactivateSuccess")
              console.log("Deactivated");
          }
        });
        }
      if(this.state.deregistertype ==='forgetme'){
        console.log("here")
        Axios.auth.postDeregister("/forgetuser",this.state.userdata)
        .then(response => {
          console.log(response);
          if (response.data.status === 400) {
              console.log(response.data.message);          
            document.getElementById("a1").innerText="Incorrect";
         }
         else if (response.data.status === 200) {
            this.setState({showModal: false});
            window.location.replace("http://localhost:8008/#/forgetmeSuccess")
            window.location.reload("http://localhost:8008/#/forgetmeSuccess")
         console.log("Deactivated");
     }
   });
     }
        console.log(this.state.userdata);     
      }
      getPassword = (e)=>{

        console.log(e.target.value);
        this.setState({userdata:{...this.state.userdata,password:e.target.value}});
      }
      onClickLink = (e) =>{        
        this.setState({
            operation:!this.state.operation,
            clicked:true,
            deregistertype:e.target.name
                })         
          console.log("clicked")
          console.log(e.target.name);    
      }

      ClearError=()=>{
        document.getElementById("a1").innerText="";

      }

      
  render() {
    // console.log(this.props.state.userId);
    let check  = (       
          <div>
              <br></br>
           
              <a href ="#" onClick={this.onClickLink} name="deactivate" data-toggle="modal" data-target="#myModal">Deactivate</a> |
            
              <a href ="#" onClick={this.onClickLink}  name="forgetme" data-toggle="modal" data-target="#myModal"> Forget Me</a>  
              
            <br /> <br /> <br />
        <div className="modal" id="myModal"   >
              <div className="modal-dialog">
                <div className="modal-content">
                
                  
                  <div className="modal-header">
                    <h4 className="modal-title">Enter Password</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                
                  <div className="modal-body">
                     <input type="password" name="password" onChange={this.getPassword} onFocus={this.ClearError}/>
                     <br></br>
                     <span id="a1" style={{color:"red"}}></span>
                  </div>                
                  <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.onClickPasswordCheck} >Submit</button>
                   <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>                 
                </div>
              </div>
            </div>

        </div> 
         
    );
    return (
      
          <div className="text-center">
          <h1 className="text-center">Welcome Page</h1>
          <br/>
          <br/>
          <hr/>
 
          <button className="btn btn-primary" onClick={this.updateProfile}>Update profile</button>
          <br/>
          <br/>
         
          <button className="btn btn-primary" onClick={this.changePassword} >Change Password</button>
          <br />
          <br />
          <button className="btn btn-primary" onClick={this.displayReviews} >Reviews </button>
          <br />
          <br />
          <div>      
          <button className="btn btn-primary" onClick={this.DeregisterEventHandler}> Deregister</button>
          {
              this.state.display? check : <p></p>
           
          }
         
           </div>
           </div>
    )
  }
}

DeregisterButton.propTypes = {
  state: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  state: state.register
})

export default connect(mapStateToProps, { })(DeregisterButton);
