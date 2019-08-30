import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from '../../Axios';
import ReviewCard from './ReviewCard'
export default class DisplayReviews extends Component {

    constructor(props){
        super(props)
        this.state={
            userreviewdata :{
              username :"",
              userreview :""
            },
            fullList:[]
            //fullList: [{userid:1,username:"renu",userreview:"kwenk"},{userid:2,username:"renwdweu",userreview:"kweewdnk"} ]
          
        }
    }

    componentDidMount() {
        Axios.auth.getDeregister("/getreviews")
          .then(response => this.setState({ fullList: response.data }))
          
      }

    render() {
        return (
        
            
            <div>
            <h2> User Reviews</h2>
            {
            this.state.fullList.map((review,index)=> <ReviewCard key={review.uid} name={review.firstName} review ={review.review}></ReviewCard>
           )
        }
    </div>
         
        )
      }
    }
