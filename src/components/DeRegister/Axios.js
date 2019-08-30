import axios from 'axios';

const axcreate =  axios.create({
    baseURL: "http://10.150.176.143:8091/api/v1/users",
    responseType: "json"
})

export default{
    auth: {
        postusersForget(data){
            return axcreate.post("/forgetuser",data);
        },
        getReviews(data){
            return axcreate.get("/getreviews",data);
        },
        postusersDeactivate(data){
            return axcreate.post("/deactivate",data);
        }
    }

}