/**
  * 1990-2019 Publicis Sapient Corporation. All rights reserved.   
*/

// Registration Page

import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import Axios from '../../Axios';
import GoogleLogin from 'react-google-login';
import SimpleReactValidator from 'simple-react-validator';
import Form from './Form';
import GoogleForm from './GoogleForm';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { connect } from 'react-redux';
import { fetchSecurityQuestions, filterSecurityQuestions, filterSecurityQuestionOne, filterSecurityQuestionTwo } from '../../actions/registerAction';

class RegistrationPage extends Component {

  constructor(props){
    super(props);
    this.state={
      googleregistration : false
    }
  }

  componentDidMount() {
    this.props.fetchSecurityQuestions(this.filterQuestion);
  }
  
  filterQuestion = (questionID, question) => {


    let securityQuestions = this.props.state.fullList.filter((list) => {
      return list.questionID !== parseInt(questionID)
    }).map((list) => { return list });

    if (question === 1) {
      this.props.filterSecurityQuestionOne({
        questionID: parseInt(questionID),
        securityQuestions: securityQuestions
      });
    }

    else if (question === 2) {
      this.props.filterSecurityQuestionTwo({
        questionID: parseInt(questionID),
        securityQuestions: securityQuestions
      });
    }
    else {
      this.props.filterSecurityQuestions({
        questionID: parseInt(questionID),
        securityQuestions: securityQuestions
      });
    }

  }

  changeToGoogleForm = (email , firstname, lastname) =>{
    console.log("Google Registration");
    console.log(email);
    this.setState({email : email , firstName : firstname , lastName : lastname, googleregistration : true});
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     users: {
  //       firstName: "",
  //       lastName: "",
  //       emailID: "",
  //       phoneNo: "",

  //       passwordHistory: {
  //         pwd1: ""
  //       },
  //       securityAns: {
  //         securityQueID1: 1,
  //         securityQueID2: 2,
  //         securityAnsID1: "",
  //         securityAnsID2: ""
  //       }
  //     },
  //     allcorrect: true,
  //     captchaver: true,

  //     fullList: [],
  //     securityQuestion1: [],
  //     securityQuestion2: [],
  //     firstnamereadonly: false,
  //     lasstnamereadonly: false,
  //     emailreadonly: false,

  //   };
  //   this.validator = new SimpleReactValidator();

  // }

  // componentDidMount() {
  //   this.props.fetchSecurityQuestions();
  // }

  // // firstName / lastname / email / phonenumber enters in the input box this will be fired 
  // userDataEventHandler = (event) => {
  //   const newUsers = {};
  //   newUsers[event.target.name] = event.target.value;
  //   this.setState({ users: { ...this.state.users, ...newUsers } });
  // }

  // // password enters in the input box this will be fired 
  // PasswordEventHandler = (event) => {
  //   this.setState({ users: { ...this.state.users, passwordHistory: { pwd1: event.target.value } } });
  // }

  // // confirmnpassword enters in the input box this will be fired 
  // ConfirmPasswordEventHandler = (event) => {
  //   if (this.state.users.passwordHistory.pwd1 === event.target.value)
  //     document.getElementById("conpasscheck").innerHTML = "";
  //   else
  //     document.getElementById("conpasscheck").innerHTML = "Password and Confirm Password should be same"
  // }






  // recaptchaLoaded = () => {
  //   console.log('captcha has loaded');
  // }

  // verifyCallback = (response) => {
  //   if (response) {
  //     this.setState({ captchaver: true });
  //   }
  // }

  // // Scurity question changing thsi will be called
  // filterQuestion = (questionID, question) => {

  //   let securityQuestions = this.state.fullList.filter((list) => {
  //     return list.questionID !== parseInt(questionID)
  //   }).map((list) => { return list });

  //   if (question === 1) {
  //     this.setState({ users: { ...this.state.users, securityAns: { ...this.state.users.securityAns, securityQueID1: parseInt(questionID) } }, securityQuestion2: securityQuestions });
  //   }

  //   else if (question === 2)
  //     this.setState({ users: { ...this.state.users, securityAns: { ...this.state.users.securityAns, securityQueID2: parseInt(questionID) } }, securityQuestion1: securityQuestions });

  //   else {
  //     this.setState({ securityQuestion1: this.state.fullList });
  //     this.setState({ securityQuestion2: securityQuestions });
  //   }

  // }

  // // security answer enters in the input box this will be called
  // securityAnswers = (answer, answerID) => {

  //   if (answerID === 1)
  //     this.setState({ users: { ...this.state.users, securityAns: { ...this.state.users.securityAns, securityAnsID1: answer } } });

  //   else if (answerID === 2)
  //     this.setState({ users: { ...this.state.users, securityAns: { ...this.state.users.securityAns, securityAnsID2: answer } } });
  // }

  // responseGoogleSuccess = (response) => {
  //   console.log(response.profileObj);
  //   this.setState({ users: { ...this.state.users, emailID: response.profileObj.email, firstName: response.profileObj.givenName, lastName: response.profileObj.familyName } }
  //     , () => {
  //       this.setState({ ...this.state, firstnamereadonly: true, lastnamereadonly: true, emailreadonly: true });
  //     })
  //     ;

  // }

  // responseGoogleFailure = (response) => {
  //   console.log(response);
  // }


  render() {



    return (
      this.state.googleregistration ? <GoogleForm filterQuestion={this.filterQuestion} data={this.state}></GoogleForm> : <Form filterQuestion={this.filterQuestion} googleregistration={this.changeToGoogleForm}></Form>
  
    )
  }
}

RegistrationPage.propTypes = {
  fetchSecurityQuestions: PropTypes.func.isRequired,
  filterSecurityQuestionOne: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  state: state.register
})

export default connect(mapStateToProps, { fetchSecurityQuestions, filterSecurityQuestions, filterSecurityQuestionOne, filterSecurityQuestionTwo})(RegistrationPage);
