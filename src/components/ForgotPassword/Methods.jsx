import React from 'react';
import Axios from 'axios';
import Securityquestion from './Securityquestions';
import OTPtoMail from './OTPtoMail';

export default class Methods extends React.Component{
    constructor(props){
      super(props)
      this.click = this.click.bind(this);
      this.nothing=this.nothing.bind(this);
      this.state={
          data:null,
          checked:"0"
      }
    }
    click(){
        console.log("hais")
        var cc = document.getElementsByName("method");
        var i;
        var data;
        console.log(cc)
        for(i=0;i<cc.length;i++){
            if(cc[i].checked){
                data={
                    choice:cc[i].value,
                    email:this.props.email
                }
            }
        }
        //Axios.post("http://10.150.176.135:8009/forgotpassword/mts",data).then(res => this.setState({data:res.data,checked:data.choice}) )
        Axios.forgotPassword("/mts",data).then(res => this.setState({data:res.data,checked:data.choice}) )
       // Axios.post("http://10.150.121.20:8009/forgotpassword/mts",data).then(res => this.setState({data:res.data,checked:data.choice}));
    }
    nothing(){
        this.setState({checked:"0"})
    }
    render(){
        return(
            <div>
               
                   <input type="radio" name="method" value="1" id="1" onChange={this.nothing}/>Send link to the email<br/>
                   <input type="radio" name="method" value="2" id="2" onChange={this.nothing}/>Send OTP to email<br/>
                   <input type="radio" name="method" value="3" id="3"  onChange={this.click}/>Security Questions<br/>
                   <input type="email"  value={this.props.email} name="email" id="email" hidden></input>
                  {/*<input type="button" id="question" onClick={this.click} value="SUBMIT"></input>*/}
                    {this.state.checked==="1"?<Securityquestion ques1={this.state.data.question1} ques2={this.state.data.question2}/>:''}
                    {this.state.checked==="2"?<OTPtoMail/>:null}
                    {this.state.checked==="3"?<Securityquestion email={this.props.email} ques1={this.state.data.question1} ques2={this.state.data.question2}/>:''}
   
            </div>
        );
    }
}