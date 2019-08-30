import React, { Component } from 'react'


export default class ForgetMeSuccess extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.history.location.state);
    }



    render(){
        return(
            <div>
                
                <h2>Successfully deleted your account.</h2>
            </div>
        )
    }
}