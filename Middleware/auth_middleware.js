import jwt from 'jsonwebtoken'
import UserModel from '../Models/User.js'
const checkUserAuth=async(req,res,next)=>{
    // token get
    let token;
    const {authorization}=req.headers
    console.log(authorization);
    if(authorization &&authorization.startsWith('Bearer')){
try{
    //get token from header
  token=authorization.split(' ')[1];

//  console.log(token)
 
    

//verify token:-

const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY);//according to create token userID
console.log(userID);
//  get user from token:-
req.user=await  UserModel.findById(userID).select('-userpass');//no password...
console.log(req.user);
next();


}
catch(error){
    console.log(error);
res.status(401).send({status:"failed",message:"unauthorized user"});
}
    }
else{
    res.status(401).send({status:"failed",message:"unauthorized user please provide authentication"});
}
    
   
}
export default checkUserAuth;