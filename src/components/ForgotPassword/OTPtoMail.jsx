import React from 'react';
import Axios from 'axios';
import Setpassword from './Setpassword';

import { Link} from 'react-router-dom';
export default class OTPtoMail extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            status:"false",
            value:null
        }
        this.click=this.click.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    click(){
        let data={
            otp:this.state.value,   
        }
        console.log(data);
        //Axios.post("http://10.150.176.132:8076/forgotpassword/otp",data).then(res => console.log(res));
        Axios.forgotPassword("/otp",data).then(res => this.setState({status:res.data.status}));
        //Axios.post("http://192.168.43.237:8076/forgotpassword/otp",data).then(res => this.setState({status:res.data.status}));
    
    }
      handleChange(e){
            this.setState({value:e.target.value})
      }
    render(){
        return(
            <div>
                <h2>Please enter OTP</h2>
                
               <input type="password" id="otp" name="otp" onChange={this.handleChange}></input><br></br>
               <input className="btn btn-primary bbb" type="submit" onClick={this.click}></input><br/>
               {this.state.status==='true'?  <Link to ={Setpassword} >SetPassword </Link>:null}

            </div>
        );
    }
}