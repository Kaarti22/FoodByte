import mongoose from "mongoose";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);

    const {cartProducts, address} = await req.json();
    
}