import dns from "node:dns";
import mongoose from "mongoose";

// Forzar a Node.js a resolver DNS usando Google directamente
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try{
        const mongodb = process.env.MONGODB_URI;
        await mongoose.connect(mongodb);
        console.log('Conexión a BD exitosa') 
    }catch(error){
        console.error('Error al conectarse con mongoDB.')
        console.error(error);
        process.exit(1);
    }
    
} 

export default connectDB;