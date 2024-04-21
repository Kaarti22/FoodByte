import { Category } from "@/models/category";
import mongoose from "mongoose";

export async function GET(req){
    mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    console.log(_id);
}