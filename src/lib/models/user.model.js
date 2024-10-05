import mongoose from "mongoose";

const userSchema = ({
    checkId: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: True
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    }
    ,
    avatar:{
        type: String,
        required:true,
    }
    
},{timeStamps:true});

const User = mongoose.model.User || mongoose.model('User',userSchema);

export default User;
