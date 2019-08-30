import React from 'react';
import Axios from 'axios';
import { Link} from 'react-router-dom';
export default class Securityquestions extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            status:"false",
            msg:null
        }
        this.click=this.click.bind(this)
    }
    click(){
        let data={
            ans1:document.getElementById("ans1").value,
            ans2:document.getElementById("ans2").value,
            email:this.props.email
        }
        console.log(data);
        //Axios.post("http://10.150.176.200:8076/forgotpassword/sec",data).then(res => console.log(res));
        //Axios.post("http://10.150.176.135:8009/forgotpassword/sec",data).then(res => this.setState({status:res.data.status,msg:'please enter correct answers'}));
        Axios.forgotPassword("/sec",data).then(res => this.setState({status:res.data.status,msg:'please enter correct answers'}));
       //Axios.post("http://10.150.121.20:8009/forgotpassword/sec",data).then(res => this.setState({status:res.data.status,msg:'please enter correct answers'}));
      }
    render(){
        return(
            <div>
                <h2>Please answer the following security Questions</h2>
                <h6>{this.props.ques1}:  </h6>
               <input type="text" name="ans1" id="ans1" ></input><br/>
               <h6>{this.props.ques2}:  </h6>
               <input type="text" name="ans2" id="ans2" ></input><br/>
               <input className="btn btn-primary bbb1" type="submit" onClick={this.click}></input><br/>
               {this.state.status==='true'?  <Link to ={`/forgotpassword/Setpassword`} >Setpassword</Link>:this.state.msg}
            </div>
        );
    }
}