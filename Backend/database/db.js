import mongoose from "mongoose";



export const Connection=async(username,password) =>{
    
    const URL=`mongodb+srv://${username}:${password}@cluster0.18dembo.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
       console.log("Database connection established");
    }catch(error){
        console.log('Error while connecting the database',error.message);
    }
}

export default Connection;