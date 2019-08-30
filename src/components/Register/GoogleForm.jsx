import React, { Component } from 'react'
import Recaptcha from 'react-recaptcha';
import Axios from '../../Axios';
import GoogleLogin from 'react-google-login';
import history from '../../history';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userDataEventHandler, passwordEventHandler, selectBoxEventHandler, securityAnswers } from '../../actions/registerAction';


const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const phoneNoRegex = RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_#?&])[A-Za-z\d@$!%_#*?&]{8,15}$/);


class GoogleForm extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            confirmPassword: "",
            gender: ['Male', 'Female', 'Other'],
            maritalStatus: ['Single', 'Married', 'Widowed', 'Divorced', 'Separated'],
            formErrors: {
                firstName: "",
                lastName: "",
                emailID: "",
                phoneNo: "",
                password: "",
                confirmPassword: "",
                securityAnsID1: "",
                securityAnsID2: ""
            }

        }
    }

    componentWillMount (){
        this.props.state.users.firstName = this.props.data.firstName;
        this.props.state.users.lastName = this.props.data.lastName;
        this.props.state.users.emailID = this.props.data.email;
        
    }

    formValid () {
        let valid = true;
        let formErrors = this.state.formErrors;
      
        Object.values(formErrors).forEach(value => {
            value.length > 0 && (valid = false);
        });

        return valid;
    }

    validate = (name, value) => {
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'firstName':
                //console.log(formErrors.firstName)
                formErrors.firstName = (value.length < 5 || value.length > 15) ?
                    "FirstName should be between 5 to 15 characters" : "";
                    console.log(formErrors.firstName)
                break;
            case 'lastName':
                formErrors.lastName = (value.length < 5 || value.length > 15) ?
                    "LastName should be between 5 to 15 characters" : "";
                break;
            case 'phoneNo':
                formErrors.phoneNo = (phoneNoRegex.test(value) && value.length > 0) ?
                    '' : "Invalid Phone Numeber";
                break;
           case 'password':
                formErrors.password = (passwordRegex.test(value) ) ?
                    '' : "Password should be minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
                break;
            case 'confirmPassword':
                formErrors.confirmPassword = (value === this.state.confirmPassword ) ?
                    '' : "Both Password and Confirm Password Should match";
                break;
            case 'securityAnsID1':
                formErrors.securityAnsID1 = value.length === 0 ?
                    "Answer the Security Question One" : ''
                break;
            case 'securityAnsID2':
                formErrors.securityAnsID2 = value.length === 0 ?
                    "Answer the Security Question Two" : ''
                break;
            default:
                break;

        }
        this.setState({ formErrors });
    }

    register = (event) => {
      
        Object.keys(this.state.formErrors).forEach(key => {
           this.validate(key, this.props.state.users[key]);
        });

        console.log("HELLO");
        console.log(this.formValid());
        // // code to validate all input cases
        if (this.formValid() === true) {
            console.log("SUCCESS");
            // Axios.auth.postusers(this.props.state.users)
            //     .then(response => {
            //         console.log(response);
            //         if (response.status === 200) {
            //             // User already exists
            //             history.push('/error');
            //             console.log("Error")
            //         }
            //         else if (response.status === 200) {
            //             // User details has been succesfully entered into the database
            //             // Calling login API
            //             // window.location.assign("http://localhost:8014/#");
            //             console.log("success")
            //         }
            //     }).catch(error => {
            //         if (error.response)
            //             console.log(error.response);
            //     });
        }
        else {
            console.log("ERRORS");
        }


    }



    // firstName / lastname / email / phonenumber enters in the input box will be fired 
    userDataEventHandler = (event) => {
        let newUsers = {};
        this.props.state.users[event.target.name] = event.target.value;
        newUsers = { ...this.props.state.users };
        this.props.userDataEventHandler(newUsers);
        console.log(this.props.state)
        const { name, value } = event.target;
        this.validate(name, value);

    }

    // password enters in the input box will be fired 
    passwordEventHandler = (event) => {
        const { name, value } = event.target;

        this.props.passwordEventHandler(value);

        this.validate(name, value);

    }

    // confirmnpassword enters in the input box will be fired 
    confirmPasswordEventHandler = (event) => {
        const { name, value } = event.target;
        this.validate(name, value);
        this.setState({ confirmPassword: value });
    }

    selectBoxEventHandler = (event) => {
        const { name, value } = event.target;
        this.props.selectBoxEventHandler({ name: name, value: value });
    }

    // security answer enters in the input box will be called
    securityAnswers = (answer, answerID) => {

        let data = {
            answerID: answerID,
            answer: answer
        }

        this.validate(answerID, answer);

        this.props.securityAnswers(data);
    }

    recaptchaLoaded = () => {
        console.log('captcha has loaded');
    }

    verifyCallback = (response) => {
        // if (response) {
        //     setState({ captchaver: true });
        // }
    }

    responseGoogleSuccess = (response) => {
        console.log(response);
        this.setState({ users: { ...this.state.users, emailID: response.profileObj.email, firstName: response.profileObj.givenName, lastName: response.profileObj.familyName } }
            , () => {
                this.setState({ ...this.state, firstnamereadonly: true, lastnamereadonly: true, emailreadonly: true });
            });
    }

    responseGoogleFailure = (response) => {
        console.log(response);
    }


    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <form onSubmit={(e) => { this.register(); e.preventDefault(); }}>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label" >FirstName</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="FirstName" name="firstName"

                                noValidate
                                onChange={this.userDataEventHandler}
                                value={this.props.state.users.firstName}
                            />
                            {formErrors.firstName.length > 0 && (
                                <span>{formErrors.firstName}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">LastName</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="LastName" name="lastName"

                                onChange={this.userDataEventHandler}
                                value={this.props.state.users.lastName}
                            />
                            {formErrors.lastName.length > 0 && (
                                <span>{formErrors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">EmailID</label>
                        <div className="col-sm-4">
                            <input type="email" className="form-control" placeholder="EmailID" name="emailID"

                                readOnly
                                value={this.props.state.users.emailID}
                            />
                            {/*formErrors.emailID.length > 0 && (
                                <span>{formErrors.emailID}</span>
                            )*/}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">PhoneNo</label>
                        <div className="col-sm-4">
                            <input type="number" className="form-control" placeholder="PhoneNo" name="phoneNo"

                                onChange={this.userDataEventHandler}
                                value={this.props.state.users.phoneNo}
                            />
                            {formErrors.phoneNo.length > 0 && (
                                <span>{formErrors.phoneNo}</span>
                            )}
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" placeholder="Password" name="pwd1"

                                onChange={this.passwordEventHandler}
                                value={this.props.state.users.passwordHistory.pwd1}
                            />
                            {formErrors.password.length > 0 && (
                                <span>{formErrors.password}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Confirm Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword"

                                onChange={this.confirmPasswordEventHandler}
                            />
                            {formErrors.confirmPassword.length > 0 && (
                                <span>{formErrors.confirmPassword}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Gender</label>
                        <div className="col-sm-3">
                            <select className="gender" name="gender"
                                onChange={(e) => this.selectBoxEventHandler(e)}>
                                {this.state.gender.map((gender, index) =>
                                    <option key={index} value={gender}> {gender} </option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Marital Status</label>
                        <div className="col-sm-3">
                            <select className="maritalStatus" name="maritalStatus"
                                onChange={(e) => this.selectBoxEventHandler(e)}>
                                {this.state.maritalStatus.map((status, index) =>
                                    <option key={index} value={status}> {status} </option>
                                )}
                            </select>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Profession</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Profession" name="profession"

                                onChange={this.userDataEventHandler}
                                value={this.props.state.users.profession}
                            />
                            {/* {formErrors.lastName.length > 0 && (
            <span>{formErrors.lastName}</span>
        )} */ }
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Date Of Birth</label>
                        <div className="col-sm-4">
                            <input type="date" className="form-control" placeholder="Date Of Birth" name="dateOfBirth"

                                onChange={this.userDataEventHandler}
                                value={this.props.state.users.dateOfBirth}
                            />
                            {/* {formErrors.lastName.length > 0 && (
            <span>{formErrors.lastName}</span>
        )} */}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Security Question 1</label>
                        <div className="col-sm-3">
                            <select className="security" name="securityQueID1"
                                onChange={(e) => this.props.filterQuestion(e.target.value, 1)}>
                                {this.props.state.securityQuestion1.map(questions =>
                                    <option key={questions.questionID} value={questions.questionID}> {questions.question} </option>
                                )}
                            </select>
                        </div>

                        <div className="col-sm-4">
                            <input type="text" name="securityAnsID1"

                                onChange={(e) => this.securityAnswers(e.target.value, "securityAnsID1")}
                                value={this.props.state.users.securityAns.securityAnsID1}
                            />
                            {/*formErrors.securityAnsID1.length > 0 && (
                                <span>{formErrors.securityAnsID1}</span>
                            )*/}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-1 col-form-label">Security Question 2</label>
                        <div className="col-sm-3">
                            <select className="security" name="securityQueID2"
                                onChange={(e) => this.props.filterQuestion(e.target.value, 2)}>
                                {this.props.state.securityQuestion2.map(questions =>
                                    <option key={questions.questionID} value={questions.questionID}>{questions.question}</option>
                                )}
                            </select>
                        </div>

                        <div className="col-sm-4">
                            <input type="text" name="securityAnsID2"

                                onChange={(e) => this.securityAnswers(e.target.value, "securityAnsID2")}
                                value={this.props.state.users.securityAns.securityAnsID2}
                            />
                            {/*formErrors.securityAnsID2.length > 0 && (
                                <span>{formErrors.securityAnsID2}</span>
                            )*/}
                        </div>
                    </div>

                    {/* <Recaptcha
    sitekey="6LcE97EUAAAAAJ-MJMDdEt2fX5KDN_pjsdbCQ-pJ"
    render="explicit"
    onloadCallback={this.recaptchaLoaded}
    verifyCallback={this.verifyCallback}
/> */}
                    <br />
                    <button className="btn btn-primary" type="submit">Submit</button>

                </form>
                
                
            </div>

        );
        
        
    }



}

GoogleForm.propTypes = {
    userDataEventHandler: PropTypes.func.isRequired,
    passwordEventHandler: PropTypes.func.isRequired,
    selectBoxEventHandler: PropTypes.func.isRequired,
    securityAnswers: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    state: state.register
})

export default connect(mapStateToProps, { userDataEventHandler, passwordEventHandler, selectBoxEventHandler, securityAnswers })(GoogleForm);
