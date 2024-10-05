import mongoose from 'mongoose'


let initialized = false;

export const connect = async()=>{
    mongoose.set('strictQuery',true);

    if (initialized){
        console.log("MongoDB is already coonnected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"LB",
            useNewUrlParser:true,
            useUnifiedTopology:true

        });
        console.log('It is connected')
        initialized = true;
    }
    catch(error){

        console.error(error);

    }
}