import User from "../models/users";
import {connect} from '../dbConnection/mongoose'

export const createUser = async (
    id,
    image_url,
    username,
    first_name,
    last_name,
    email_addresses
) => {

    try{
        await connect();
        const name = `${first_name} ${last_name}`

        const existingUser = await User.findOne({authId: id});
        if(existingUser) {throw new Error ('User already Exits')}

        const newUser  = await User({
            authId: id,
            name: name,
            email: email_addresses[0].email_address,
            username: username,
            profileImg: image_url
        });

        await newUser.save();
        return newUser;
    } catch(error) {
        console.log('error while creating and updating:', error);
        throw error;
    }
};

export const updateUser = async (
    id,
    image_url,
    username,
    first_name,
    last_name,
    email_addresses
) => {
    try{
        await connect();
        const name = `${first_name} ${last_name}`;

        const updatedUser = await User.findOneAndUpdate(
            { authId: id },
            {
                $set: {
                    name: name,
                    email: email_addresses[0].email_address,
                    username: username,
                    profileImg: image_url
                }
            },
            { new: true }
        );

        if(!updateUser){throw new Error('User not Found')}

        return updatedUser;

    } catch(error){
        console.log('Error while updating user:', error);
        throw error;
    }
}

export const deleteUser = async(id) => {
    try {
        await connect();
        
        await User.findOneAndDelete({authId: id});
    } catch (error) {
        console.log('Error deleting user', error);
    }
}

