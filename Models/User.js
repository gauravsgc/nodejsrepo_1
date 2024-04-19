import mongoose from "mongoose";
//defining schema
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true,minLength:3,trim:true},
    userpass:{type:String,required:true,trim:true}
})
//model:--
const UserModel=mongoose.model("user",userSchema);
// module.exports=UserModel;
export default UserModel;
