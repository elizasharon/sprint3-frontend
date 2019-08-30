import React,{Component} from 'react';
import axios from 'axios';
import Axios from '../../Axios';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css'; // optional styles
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class EditProfile extends Component {


    constructor(){
        super();
        this.state={
                user:{
                  userId: '',
                  firstName:'',
                  lastName:'',
                  emailID: '' ,
                  phoneNo: '',
                  gender:'',
                  profession:'',
                  maritalStatus:'',
                  dateOfBirth: ''
                },    
                disabledFields:true,
                disabledButton:true,
                valid:true,
                modal:false
        }

    this.toggle = this.toggle.bind(this);

    }

toggle = () =>{
  this.setState({modal : !this.state.modal});
}

    mask(){
        //console.log("aaaya "+ this.state.disabled);
        this.setState({
            user:this.state.user,
            disabledFields:!this.state.disabledFields,
            valid:true,
            disabled:!this.state.disabled
        })
    }
  
    notify = (type,msg) => {
      if(type=="success")
      { 
          console.log('inside success')
          toast.notify(msg, {
            position: 'bottom-right',
            duration:5000
          });
       }
       else
       {
          toast.notify(msg, {
            position: 'bottom-right',
            duration: 5000
          })
       }
    }
    
    componentDidMount(){
     /* let data={
            fname:'demo',
            lname:'user',
            email:'demo@demo.demo',
            phone:'88888888'
        }
        this.setState({
            user: data
        })*/
 
      Axios.editProfile('/4')
        .then(res => {
          const data = res.data;
          //console.log(data);
          this.setState({
            user: data,
            oldUserData : data
          })
        })
    }


    
   updateFields(e,field){
    let data=this.state.user;
    console.log(data);
    this.validationfunction();
    if(field==="first_name"){
        data.firstName=e.target.value;
    }
    else if( field==="last_name"){
        data.lastName=e.target.value;
    }
    else if(field==="phone_no"){
        data.phoneNo=e.target.value;
    }
    else if(field==="profession"){
      console.log(e);
      data.profession=e.target.value;
    }
    else if(field==="maritalStatus"){
      console.log(e);
      data.maritalStatus=e.target.value;
    }
    else if(field==="date"){
      let format='';
      var dd = e.getDate();
      var mm = e.getMonth()+1; 
      var yyyy = e.getFullYear();
      if(dd<10) 
        dd='0'+dd;
      if(mm<10) 
        mm='0'+mm;
      format = dd+'/'+mm+'/'+yyyy;
      console.log(format);
      data.dateOfBirth=dd+'/'+mm+'/'+yyyy+'';
      this.state.user.dateOfBirth=dd+'/'+mm+'/'+yyyy+'';
      console.log(data.dateOfBirth);
    }
    else if(field==="gender"){
      console.log("e"+e.target.value);
      data.gender=e.target.value;
    }
    console.log(JSON.stringify(this.state.user.dateOfBirth) );
    //if(JSON.stringify(this.state.oldUserData)===JSON.stringify(data))
    //  this.setState({user:data,disabledButton:true,oldUserData:this.state.oldUserData});
    //else 
    this.setState({user:data,disabledButton:false,valid:this.state.valid});
    console.log(this.state.dateOfBirth)
   }

   checkedGender(id){
     let gender=this.state.user.gender;
     console.log("inside checked gender");
     if(id===gender){
        return true;
     }
     else{
       return false;
     }
   }
   checkMaritalStatus(id){
     let status=this.state.user.maritalStatus;
     if(id===status){
       return true;
     }
     else{
       return false;
     }
   }
   checkProfession(id){
     let profession=this.state.user.profession;
     if(id===profession){
       return true;
     }
     else{
       return false;
     }
   }


   update(e){
     // e.preventDefault();
     //console.log(this.state.user);
     console.log(this.state.user.dateOfBirth)
      const user = {
            userID:4,
            firstName:this.state.user.firstName,
            lastName:this.state.user.lastName,
            dateOfbirth:this.state.user.dateOfBirth,
            emailID: this.state.user.emailID ,
            phoneNo: this.state.user.phoneNo,
            gender:this.state.user.gender,
            date:this.state.user.date,
            maritalStatus:this.state.user.maritalStatus,
            profession:this.state.user.profession
           // address:'dsad'
      }
      console.log(JSON.stringify(user)+"POSSSSSSSTTTTTTTTTTTTTTT");
      
      Axios.editProfile('/updateUser', user)
      .then(res => {
        console.log(JSON.stringify(user) + " "+ JSON.stringify(res))
        const data=res.data;
        //console.log('inside axios')
        //console.log(toast.notify())
        if(data==="User Updated Successfully!")
        {   console.log('!!!!!!!!!!!!!')
            this.notify("success","Updated successfully!")

        }
        else if(data=='User NOT FOUND!')
        {
          this.notify('error',"User not found!")
        }
        else{
          this.notify('error',"Error updating profile")
        }
        })
    
      
      //.then(res => console.log(res.data));/*

      this.mask();
      //alert('Profile Updated Successfully');
      // console.log(this.state.log);
      // axios.post('http://localhost:8018/updateUser', 
      //     { id:2,
      //       email: this.state.email ,
      //       fname:this.state.fname,
      //       lname:this.state.lname,
      //       role:'user',
      //       phone: this.state.phone,
      //       address:'dsad'
      //     });
    
   }

   pingForOtp(){
    console.log(this.state.valid+" gg");
    if(!this.state.valid)
      this.notify('success','Invalid Form');
    else this.toggle();
    
   // axios.post('http://localhost:8091/sendOtp', { emailid: this.state.user.emailid });
   }

   submitHandler = event =>{
        event.preventDefault();
        //console.log("submited*******");
        return this.validationfunction();
    }

   validationfunction = () => {
        console.log(this.state);
        this.state.valid=true;
     var text="";
     var text2="",text3="";
     var recheck = new RegExp("^([6-9]{1})([0-9]{9})$");


     console.log("inside validation function")
    let firstName=document.getElementById("t1").value;
    let lastName=document.getElementById("t2").value;
    let phoneNo=document.getElementById("t3").value;
    console.log("first_name!!!!!"+firstName)

    if(firstName===""){
      console.log("first_name!!!!!"+firstName)
      text="First Name should not be Empty";
      this.state.valid=false;
    }
    
    if(lastName===""){
      text2="LastName should not be Empty";
      this.state.valid=false;
    }
    
    if(!recheck.test(phoneNo)){
      text3="Enter valid Mobile number";
      this.state.valid=false;
    }
    document.getElementById("msg1").innerHTML = text;
    document.getElementById("msg2").innerHTML = text2;
    document.getElementById("msg3").innerHTML = text3;
    console.log(this.state.valid);
    this.setState({valid:this.state.valid})
    if(this.state.valid)
      return true;
    else
      return false;

   }

    render(){
        return  (

            <div className="container row col-lg-5">

          <br/>
              <form onSubmit={this.submitHandler}>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">First Name:</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="firstName" id="t1" value={this.state.user.firstName} disabled={this.state.disabledFields} 
                              onChange={(e)=> this.updateFields(e,"first_name")} />
                              <span id="msg1">  </span>
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Last Name:</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="lastName" id="t2" value={this.state.user.lastName} disabled={this.state.disabledFields} 
                    onChange={(e)=> this.updateFields(e,"last_name")}/>
                    <span id="msg2" >  </span>
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Email:</label>
                <div className="col-sm-8">
                  <input type="email" className="form-control" name="emailID" value={this.state.user.emailID} disabled/>
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Phone Number:</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="phoneNo" id="t3" value={this.state.user.phoneNo} disabled={this.state.disabledFields}
                  onChange={(e)=> this.updateFields(e,"phone_no")}/>
                  <span id="msg3" >  </span>
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Gender:</label>
                <div className="col-sm-8">
                <select name="gender" className="form-control" disabled={this.state.disabledFields} onChange={(e)=> this.updateFields(e,"gender")}>
                            <option value="male" selected={this.checkedGender('male')}  >Male</option>
                            <option value="female" selected={this.checkedGender('female')} >Female</option>
                            <option value="other" selected={this.checkedGender('other')} >Others</option> 
                </select>
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Date of Birth:</label>
                 <div className="col-sm-8">
                  <DatePicker className="col-sm-8 form-control" onChange={(e)=> this.updateFields(e,"date")} value={this.state.user.dateOfBirth} disabled={this.state.disabledFields} />
                  </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Marital Status:</label>
                <div className="col-sm-8">
                <select  className="form-control" name="maritalStatus" disabled={this.state.disabledFields} onChange={(e)=> this.updateFields(e,"maritalStatus")}>
                            <option value="single" selected={this.checkMaritalStatus('single')}  >Single</option>
                            <option value="married" selected={this.checkMaritalStatus('married')} >married</option>
                            <option value="widowed" selected={this.checkMaritalStatus('widowed')} >Widowed</option>
                            <option value="divorced" selected={this.checkMaritalStatus('divorced')} >Divorced</option>
                </select>
                </div>
              </div>
              <div className="form-group row">
                <label  className="col-sm-4 col-form-label">Profession</label>
                <div className="col-sm-8">
                <select className="form-control" name="profession" disabled={this.state.disabledFields} onChange={(e)=> this.updateFields(e,"profession")}>
                            <option value="student" selected={this.checkProfession('student')} >Student</option>
                            <option value="softwareengineer" selected={this.checkProfession('softwareengineer')} >Software Engineer</option>
                            <option value="developer" selected={this.checkProfession('developer')} >Developer</option>
                            <option value="tester" selected={this.checkProfession('tester')} >Tester</option>
                            <option value="hr" selected={this.checkProfession('hr')} >HR</option>
                </select>
                </div>
              </div>
                  <button onClick={()=>this.mask()} class="btn btn-default">EDIT</button>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={()=>this.pingForOtp()} disabled={this.state.disabledButton} >SUBMIT</button>
              </form>
             
              <div className="row col-lg-12">
                <Link to="/welcome">Back To HomePage</Link>
              </div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={"modalThing"}>
                      
                      <ModalBody>
                            <p>Please Enter the OTP that you have received via mail</p>
                                          Enter OTP:<br/>
                                               <input type="number" name="otp" />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary"  onClick={(e)=>this.update(e)}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>



            </div>
        );
    }
}