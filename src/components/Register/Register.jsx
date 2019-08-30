import React from 'react'
import useForm from 'react-hook-form'
import { Provider } from 'react-redux';
 import store from '../../store/store'

export default function Register() {
    const { register, handleSubmit, errors } = useForm({
        mode:'onChange'
    })
    const onSubmit = data => console.log(data)

    return (
        <Provider store={store}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="firstName" ref={register({ required: true })} />
                <br />
                {errors.firstName && 'First name is required'}
                <br /><br />
                <input name="lastName" ref={register({ required: true })} />
                <br />
                {errors.lastName && 'Last name is required'}
                <br /><br />
                <input type="submit" />
            </form>
        </Provider>
    );
}

 //  <form onSubmit={(e) => { this.validate(); e.preventDefault(); }}>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label" >FirstName</label>
    //       <div className="col-sm-4">
    //         <input type="text" className="form-control" placeholder="FirstName" onChange={this.userDataEventHandler} name="firstName" value={this.state.users.firstName} onBlur={() => this.validator.showMessageFor('firstName')}/>
    //       </div>
    //       {this.validator.message('firstName', this.state.users.firstName, 'required|alpha')}
    //     </div>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">LastName</label>
    //       <div className="col-sm-4">
    //         <input type="text" className="form-control" placeholder="LastName" name="lastName" required onChange={this.userDataEventHandler} value={this.state.users.lastName} />
    //       </div>
    //     </div>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">EmailID</label>
    //       <div className="col-sm-4">
    //         <input type="email" className="form-control" placeholder="EmailID" name="emailID" required onChange={this.userDataEventHandler} value={this.state.users.emailID} />
    //       </div>
    //     </div>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">PhoneNo</label>
    //       <div className="col-sm-4">
    //         <input type="number" className="form-control" placeholder="PhoneNo" name="phoneNo" required onChange={this.userDataEventHandler} value={this.state.users.phoneNo} />
    //       </div>
    //     </div>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">Password</label>
    //       <div className="col-sm-4">
    //         <input type="password" className="form-control" placeholder="Password" name="pwd1" required onChange={this.PasswordEventHandler} value={this.state.users.passwordHistory.pwd1} />
    //       </div>
    //     </div>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">Confirm Password</label>
    //       <div className="col-sm-4">
    //         <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" required onChange={this.ConfirmPasswordEventHandler} />
    //       </div>
    //       <span id="conpasscheck"></span>
    //     </div>


    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">Security Question 1</label>
    //       <div className="col-sm-3">
    //         <select className="security" name="securityQueID1" required onChange={(e) => this.filterQuestion(e.target.value, 1)}>
    //           {this.state.securityQuestion1.map(questions =>
    //             <option key={questions.questionID} value={questions.questionID}> {questions.question} </option>
    //           )}
    //         </select>
    //       </div>

    //       <div className="col-sm-4">
    //         <input type="text" name="securityAnsID1" required value={this.state.users.securityAns.securityAnsID1} onChange={(e) => this.securityAnswers(e.target.value, 1)}></input>
    //       </div>
    //     </div>

    //     <div className="form-group row">
    //       <label className="col-sm-1 col-form-label">Security Question 2</label>
    //       <div className="col-sm-3">
    //         <select className="security" name="securityQueID2" required onChange={(e) => this.filterQuestion(e.target.value, 2)}>
    //           {this.state.securityQuestion2.map(questions =>
    //             <option key={questions.questionID} value={questions.questionID}>{questions.question}</option>
    //           )}
    //         </select>
    //       </div>

    //       <div className="col-sm-4">
    //         <input type="text" name="securityAnsID2" required value={this.state.users.securityAns.securityAnsID2} onChange={(e) => this.securityAnswers(e.target.value, 2)}></input>
    //       </div>
    //     </div> 

    //    <Recaptcha
    //       sitekey="6LcE97EUAAAAAJ-MJMDdEt2fX5KDN_pjsdbCQ-pJ"
    //       render="explicit"
    //       onloadCallback={this.recaptchaLoaded}
    //       verifyCallback={this.verifyCallback}
    //     />
    //     <br />
    //     <button className="btn btn-primary" type="submit">Submit</button>

    //   </form>

    //   <br></br>
    //     <GoogleLogin
    //       clientId={'839355568499-6ts1o97r7bk5shr369gdrhmtvebmhrkb.apps.googleusercontent.com'}
    //       buttonText="Sign Up With Google"
    //       onSuccess={this.responseGoogleSuccess}
    //       onFailure={this.responseGoogleFailure}
    //       cookiePolicy={'single_host_origin'} />