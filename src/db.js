import mongoose from "mongoose";


export const connectDB= async()=>{
    try{
        await mongoose.connect('mongodb+srv://Alex:Alex1234@cluster0.chmtqpa.mongodb.net/prueba')
        console.log(">>> conectado")
    }catch(error){
        console.log(error)
    }
};
