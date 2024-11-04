import Library from "../models/library";
import { connect } from '../dbConnection/mongoose';

export const createLibrary = async (
    id,
    logo_url,
    name,
    members = [] 
) => {
    try {
        await connect();

        const existingLib = await Library.findOne({ authId: id });
        if (existingLib) { throw new Error('Library already exists'); }

        const newLibrary = new Library({
            authId: id,
            name: name,
            profileImg: logo_url,
            members: members 
        });

        await newLibrary.save();
        return newLibrary;
    } catch (error) {
        console.log('Error while creating library:', error);
        throw error;
    }
};

export const updateLibrary = async (
    id,
    logo_url,
    name,
    updateFields = {},
    options = {}
) => {
    try {
        await connect();

        const updatedLibrary = await Library.findOneAndUpdate(
            { authId: id },
            {
                $set: {
                    name: name,
                    profileImg: logo_url,
                },
                ...updateFields 
            },
            { new: true, ...options }
        );

        if (!updatedLibrary) { throw new Error('Library not found'); }

        return updatedLibrary;
    } catch (error) {
        console.log('Error while updating library:', error);
        throw error;
    }
};

export const deleteLibrary = async (id) => {
    try {
        await connect();
        console.log(`Deleting Library: ${id}`);
        
        await Library.findOneAndDelete({ authId: id });
    } catch (error) {
        console.log('Error deleting Library', error);
    }
};
