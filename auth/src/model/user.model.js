const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullName:{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
},
     password: { type: String ,require:()=>!this.googleId}    , // agar google id hae no needd password and agar google id nahi  to password true hae   
     googleId: { type: String  } ,// For Google OAuth users jab tume google par register kiya hoga tab google me tumra data jo hoga wo yaha store hoga wo milti hae 
     role:{
        type: String,
        enum: ['user', 'artist'],
        default: 'user'
     }




},{timestamps:true})

const User = mongoose.model('User', userSchema);

module.exports = User;