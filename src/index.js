/**
  * 1990-2019 Publicis Sapient Corporation. All rights reserved.   
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  
import {Router, Route} from 'react-router-dom';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import history from './history';
import Login from './components/Login/Login';
import RegistrationPage from './components/Register/RegistrationPage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Admin from './components/Admin/admin';
import DeregisterButton from './components/DeRegister/DeregisterButton';
import EditProfile from './components/EditProfile/edit_profile';
import ChangePassword from './components/ChangePassword/ChangePassword';
import DisplayReviews from './components/DeRegister/DisplayReviews';
// import Register from './components/Register';
import Home from './components/Home';
import Error from './components/Register/Error';
import { Provider } from 'react-redux';
import store from './store/store';

// All routing details
const router = (
   <Provider store={store}>
           <ReactNotification />
        <Router history = {history}>
        <ul>
            <Route exact path="/" component={Login} /> <br />
            <Route exact path="/register" component={RegistrationPage} /> <br />
            <Route exact path="/forgotpassword" component={ForgotPassword} /> <br />
            <Route exact path="/admin" component={Admin} /> <br />
            <Route exact path='/welcome' component={DeregisterButton} /> <br/>
            <Route exact path='/update' component={EditProfile} /> <br/>
            <Route exact path='/change' component={ChangePassword} /> <br/>
            <Route exact path='/reviews' component={DisplayReviews} /> <br/>

            <Route exact path="/error" component={Error} /> <br />
        </ul>
    </Router>
   </Provider>
)


ReactDOM.render(
    router, 
    document.getElementById('root'));
