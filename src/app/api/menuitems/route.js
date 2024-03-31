import mongoose from "mongoose";
import { MenuItem } from "@/models/menuitem";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const menuItemdoc = await MenuItem.create(data);
    return Response.json(menuItemdoc);
}