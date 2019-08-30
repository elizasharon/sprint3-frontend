import React, { Component } from 'react'


export default class DeativationSuccess extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.history.location.state);
    }



    render(){
        return(
            <div>
                
                <h2>Successfully Deactivated your account!Please login within 30 days to reactivate your account.</h2>
            </div>
        )
    }
}