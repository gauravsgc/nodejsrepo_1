import UserModel from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export default class userController{
    static userRegistration=async(req,res)=>{
        const {username,userpass}=req.body;
        
        // console.log(req.body);
       
        try{
            
            const user=await UserModel.find({username:username})
           console.log(user);
        if(user.length!=0){
            console.log(user);
res.status(409).send({status:"failed",message:"username already exists"})
        }
        else{
            const salt = bcrypt.genSaltSync(12);
            const hashpassword = bcrypt.hashSync(userpass, salt);
       

            const doc=new UserModel({
                username:username,
                userpass:hashpassword
            })
            await doc.save()
            
/*json web token*/
const saved_user=await UserModel.findOne({username:username});//which user we saved
//Generate JWT token
const token=jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
            res.status(201).send({status:'success',message:"data registerd successfully","token":token});
        }
         }
        catch(error){
            console.log(error);

        }
    }

    static userLogin=async(req,res)=>{
        try{
const {username,userpass}=req.body;
if(username &&userpass){
const user=await UserModel.findOne({username:username});
if(user!=null){
const ismatchpass=await bcrypt.compare(userpass,user.userpass);
//encrypt password and check with the request
if(user.username===username &&ismatchpass){
    /*json web token*/

//Generate JWT token
const token=jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
    res.status(200).send({status:"ture","message":"user successfully login","token":token})
}
else{
    res.status(401).send({status:"failed","message":"username or password not match"})
}

}
else{
    res.status(401).send({status:"failed","message":"not a registerd user"})
}
}
else{
    res.status(499).send({status:"failed","message":"All fields are required"})
}
        }
        catch(error){
            console.log(error);
        }
    }

    static changeUserPassword=async(req,res)=>{
        const {oldpassword,newpassword,confirmpassword}=req.body;
        if(oldpassword&&newpassword&&confirmpassword){
if(newpassword!==confirmpassword){
    res.status(401).send({status:"failed","message":"password and confirm password not match"}) 
}
else{
    const salt = bcrypt.genSaltSync(12);
    const hashpassword = bcrypt.hashSync(newpassword, salt);
    /*after validating authenticate user we will save password*/
/*check old password present*/
console.log("hello",req.user);
console.log(req.user._id);
const user=await UserModel.findOne({_id:req.user._id});
console.log(user);
const ismatchpass=await bcrypt.compare(oldpassword,user.userpass);
console.log(ismatchpass);

/*if present then update*/
if(ismatchpass){
await UserModel.findByIdAndUpdate(req.user._id,{$set:{userpass:hashpassword}})
res.status(201).send({status:"true","message":"your password updated"}) 
}
else{
    res.status(201).send({status:"false","message":"your old password not matching"}) 
}

    // res.status(201).send({status:"true","message":"password saved successfully"}) 

}
        }
        else{
            res.status(499).send({status:"failed","message":"All fields are required"})  
        }
    }
}
