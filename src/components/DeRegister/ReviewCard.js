import React,{Component} from 'react';
export default class ReviewCard extends Component {

    constructor(){
        super();
        console.log("In maincard");
    }

    render(){
        return  (
                <div>
                      <div class="card"></div>
                     
                        <div class="card-header">{this.props.name}</div>
                       
                        <div class="card-body">{ this.props.review}</div> 
                   
                 </div>
        );
    }
}