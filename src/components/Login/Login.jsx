import React from "react";
// import "../App.css";
import Axios from "../../Axios";
import { Button } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';
import { store } from 'react-notifications-component';
import {Link} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import FacebookLogin from 'react-facebook-login';
import { setUserId } from '../../actions/registerAction';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      hpassword: "",
      fields: {
        username: "",
        hpassword: ""
      },
      captchaver: false,
      errors: {},
      userObject: {
        userID: "",
        passwordHistory: {
          pwd1: ""
        }
      },
      emailIDObject: {
        emailID: "",
        passwordHistory: {
          pwd1: ""
        }
      }
    };
    this.isUsernameEmpty = this.isUsernameEmpty.bind(this);
    this.isPwdEmpty = this.isPwdEmpty.bind(this);
    this.user = this.user.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmailorUserID = this.validateEmailorUserID.bind(this);
    this.clear = this.clear.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    
    this.axiosReponse = this.axiosReponse.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
  }

  isUsernameEmpty() {
    let fields = this.state.fields;
    if (!fields["username"]) {
      return true;
    }
    return false;
  }

  isPwdEmpty() {
    let fields = this.state.fields;
    if (!fields["hpassword"]) {
      return true;
    }
    return false;
  }

  validateEmailorUserID(args) {
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    //var mailformat = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    return mailformat.test(args) ? true : false;
  }

  validateUsername(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    console.log(fields["username"])
    let errors = this.state.errors;
    let userObject = this.state.userObject;
    let emailIDObject = this.state.emailIDObject;
    let flag = this.validateEmailorUserID(fields.username);
    console.log("flag" + flag)
    if (this.isUsernameEmpty()) {
      errors["username"] = (
        <font color="red">*This Field can not be empty</font>
      );
    }
    else {
      if (!flag) {
        if (typeof fields["username"] !== "undefined") {
          if (!fields["username"].match(/^[0-9]*$/)) {
            errors["username"] = (
              <font color="red">*Please enter valid userID only.</font>
            );
          }
          else {
            errors["username"] = null;
          }
        }
        userObject["userID"] = this.state.fields.username;
      }
      else if (flag) {
        if (typeof fields["username"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          );
          if (!pattern.test(fields["username"])) {
            errors["username"] = (
              <font color="red">*Please enter valid emailID only.</font>
            );
          }
        }
        errors["username"] = null;
        emailIDObject["emailID"] = this.state.fields.username;
      }
    }
    this.setState({
      userObject: userObject,
      emailIDObject: emailIDObject,
      errors: errors,
      fields: fields
    });
  }

  validatePassword(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    console.log(fields["hpassword"])
    let errors = this.state.errors;
    let userObject = this.state.userObject;
    let emailIDObject = this.state.emailIDObject;
    if (this.isPwdEmpty()) {
      errors["hpassword"] = (
        <font color="red">*This Field can not be empty</font>
      );
    }
    else {
      if (typeof fields["hpassword"] !== "undefined") {
        if (!fields["hpassword"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
        ) {
          errors["hpassword"] = (
            <font color="red">*Please enter Strong and Valid Password</font>
          );
        }
        else {
          errors["hpassword"] = null;
        }
      }
    }
    userObject["passwordHistory"]["pwd1"] = this.state.fields.hpassword;
    emailIDObject["passwordHistory"]["pwd1"] = this.state.fields.hpassword;
    this.setState({
      userObject: userObject,
      emailIDObject: emailIDObject,
      errors: errors,
      fields: fields
    });
  }

  clear = () => {
    let userObject = { passwordHistory: {} };
    let emailIDObject = { emailID: "", passwordHistory: { pwd: "" } };
    userObject["userID"] = "";
    userObject["passwordHistory"]["pwd1"] = "";
    this.setState({
      errors: {},
      userObject: userObject,
      emailIDObject: emailIDObject,
      fields: {
        username: "",
        hpassword: ""
      }
    }, () => console.log(this.state));
  }

  recaptchaLoaded = () => {
    console.log("captcha got successfully loaded")
  }

  verifyCallback = (response) => {
    if (response) {
      this.setState({ captchaver: true });
    }
  }

  expiredCallback = (response) => {
    if (response) {
      console.log(response);
    }
  }

  axiosReponse(url, obj) {
    Axios.auth.postAuthentication(url, obj)
        .then(res => {
        console.log(res.data.userID);
        this.props.setUserId(res.data.userID);

        if (res.data.loginStatusMessage === "Authenticated") {
          console.log("in authentcated status")
          store.addNotification({
            title: "Welcome User !",
            message: "Logged in successfully",
            type: "success",
            insert: "top",
            container: "top-center",
            dismiss: {
              duration: 2000
            },
            animationIn: ["animated", "flip"],
            animationOut: ["animated", "fadeOut"],
          }, this.props.history.push('/welcome'));
          let userObject = { passwordHistory: {} };
          let emailIDObject = { emailID: "", passwordHistory: { pwd: "" } };
          userObject["userID"] = "";
          userObject["passwordHistory"]["pwd1"] = "";
          this.setState({
            errors: {},
            userObject: userObject,
            emailIDObject: emailIDObject,
            fields: {
              username: "",
              hpassword: ""
            },
            captchaver: false,
          });
        }
        else if (res.data.loginStatusMessage === "Not a confirmed user") {
          store.addNotification({
            title: "Ah oh !",
            message: "Check your email and confirm !",
            type: "warning",
            insert: "top",
            container: "top-center",
            dismiss: {
              duration: 2000
            },
            animationIn: ["animated", "flip"],
            animationOut: ["animated", "fadeOut"],
          });
        }
        else if (res.data.loginStatusMessage === "Incorrect password") {
          store.addNotification({
            title: "Error",
            message: "Incorrect Password",
            type: "danger",
            insert: "top",
            container: "top-center",
            dismiss: {
              duration: 2000
            },
            animationIn: ["animated", "flip"],
            animationOut: ["animated", "fadeOut"],
          });
          console.log()
        }
        else if (res.data.loginStatusMessage === "Blocked user, please try after one day") {
          store.addNotification({
            title: "Sorry..Blocked !",
            message: "Please try again after some time",
            type: "danger",
            insert: "top",
            container: "top-center",
            dismiss: {
              duration: 2000
            },
            animationIn: ["animated", "flip"],
            animationOut: ["animated", "fadeOut"],
          });
          console.log()
        }
        else {
          store.addNotification({
            title: "Error",
            message: "Please register first",
            type: "danger",
            insert: "top",
            container: "top-center",
            dismiss: {
              duration: 2000
            },
            animationIn: ["animated", "flip"],
            animationOut: ["animated", "fadeOut"],
          });
        }
      })
      .catch(error => {
        store.addNotification({
          title: "Error",
          message: "Network error",
          type: "danger",
          insert: "top",
          container: "top-center",
          dismiss: {
            duration: 4000
          },
          animationIn: ["animated", "flip"],
          animationOut: ["animated", "fadeOut"],
        });
        console.log("in network error")
        console.log(error.response);
       //
        //window.location.reload();
      });
  }

  user(arg) {
    arg.preventDefault();
    if (this.state.fields.username === "admin@admin.com" && this.state.fields.hpassword === "Admin@123" && this.state.captchaver) {
      //Admin page
      store.addNotification({
        title: "Welcome Admin !",
        message: "Logged in successfully",
        type: "success",
        insert: "top",
        container: "top-center",
        dismiss: {
          duration: 2000
        },
        animationIn: ["animated", "flip"],
        animationOut: ["animated", "fadeOut"],
      }, this.props.history.push('/admin'));
    }
    else {
      //Welcome page
      //let url = "http://localhost:8013/api/authenticate";
      let url = "/login"
      console.log(this.state.fields["username"]);
      console.log(this.state.fields["hpassword"]);
      let errors = this.state.errors;
      if (this.isUsernameEmpty()) {
        errors["username"] = (
          <font color="red">*This Field can not be empty</font>
        );
        this.setState({
          errors: errors
        });
      }
      if (this.isPwdEmpty()) {
        errors["hpassword"] = (
          <font color="red">*This Field can not be empty</font>
        );
        this.setState({
          errors: errors
        });
      }
      if ((errors["username"] == null) && (errors["hpassword"] == null) && this.state.captchaver) {
        console.log("hi");
        if (this.validateEmailorUserID(this.state.fields.username)) {
          console.log("In email axios method");
          console.log(this.state.emailIDObject);
          this.axiosReponse(url, this.state.emailIDObject);
        }
        else {
          console.log("In User axios method");
          console.log(this.state.userObject);
          this.axiosReponse(url, this.state.userObject);
        }
      }
    }
  }

  responseGoogle = (response) => {
    console.log("inside the google function")
    console.log('hi')
    console.log(response);
    let emailObj = {
      emailID: '',
      passwordHistory: {
        pwd1: ''
      }
    }
    emailObj["emailID"] = response.profileObj.email;
    this.setState({ emailIDObject: emailObj });
    console.log("for my details")
    //console.log(this.state.google_response);
    let url = "/google"
    console.log("inside google signin")
    //this.axiosReponse(url, this.state.emailIDObject)
    // this.setState({
    //   emailIDObject: {}
    // });
    Axios.auth.postAuthentication(url, this.state.emailIDObject)
        .then(res => {
        console.log(res.data.userID);
        this.props.setUserId(res.data.userID);
        if (res.data.loginStatusMessage === "Authenticated") {
          console.log("in authentcated status")
          this.props.history.push('/welcome')

        }
        if(res.data.loginStatusMessage=="User doesn't exist")
        {
          console.log("User doesn't exist")
          this.props.history.push("/register");
        }
      })
    

  }


  

  render() {
    return (
      <div align="center">
        <form className="form" id="form" action="/">
          <div className="text-center"><br /><br />
            <h1 className="text-center">Login</h1><br></br>
            <input
              id="uname"
              type="text"
              name="username"
              ref="clearUname"
              onKeyUp={this.validateUsername}
              placeholder="UserID or Email"
              required
            ></input>
            <div className="errorMsg">{this.state.errors.username}</div>
            <br />
            <br />
            {/* <label>Password:</label> */}
            <input
              id="pwd"
              type="password"
              name="hpassword"
              ref="clearPwd"
              onKeyUp={this.validatePassword}
              placeholder="Password"
              required
            ></input>
            <div className="errorMsg">{this.state.errors.hpassword}</div>
            <br />
            <br />
            <div align="center">
            <Recaptcha
              sitekey="6LeOqLQUAAAAAM1Hkypez7svHUsRvomYvshLYnIB"
              render="explicit"
              onloadCallback={this.recaptchaLoaded}
              onloadCallbackName='onloadCallback'
              expiredCallback={this.expiredCallback}
              expiredCallbackName='expiredCallback'
              verifyCallback={this.verifyCallback}
            />


             &nbsp;&nbsp;&nbsp;&nbsp;
      

          </div>
            <br />
            <Button
              id="login"
              variant="primary"
              type="submit"
              onClick={this.user}
            >
              Log in
          </Button>&nbsp;&nbsp;&nbsp;
          <Button
              id="reset"
              variant="primary"
              type="reset"
              onClick={this.clear}
            >
              Reset
          </Button>
          </div>
          <br />
          <br />
          <GoogleLogin
            clientId="502468487623-gv2tk6pc2oicip96qb28q2055r1tg0q0.apps.googleusercontent.com"
            buttonText="Sign In with Google"
            onSuccess={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

          {/* <FacebookLogin
                  appId="2774924292535001"

                  fields="name,email,picture"
                  buttonText="Login with facebook"
                  callback={this.responseFacebook}
                  onFailure={this.responseFacebook}
                  buttonStyle={{fontSize:8}}
                  icon="fa-facebook"
          /> */}

          <br />
          <br />
          <br />
          <div className="text-center">
            {/* CTC API */}
            <Link to="/register">Sign Up</Link>
            <span className="p-2">|</span>
            {/* Eureka API */}
            <Link to="/forgotpassword"> Forgot Password </Link>
            <br />
            <br />
            <br />
            <hr />
          </div>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  setUserId : PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  state: state.register
})

export default connect(mapStateToProps, { setUserId })(Login);
