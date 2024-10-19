import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);

    if(initialized){
        console.log('Mongodb initialized');
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'lib'
        });
        console.log('Mongodb connected')
        initialized = true;
    }catch (e) {
        console.log( 'db error: ', e);
    }
}