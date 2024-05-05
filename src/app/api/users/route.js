import mongoose from "mongoose";
import { UserInfo } from "@/models/userinfo";

export async function GET(){
  mongoose.connect(process.env.MONGO_URL);
  const userInfos = await UserInfo.find();
  return Response.json(userInfos);
};

export async function PUT(req){
  mongoose.connect(process.env.MONGO_URL);
  const {_id, ...data} = await req.json();
  await UserInfo.findByIdAndUpdate(_id, data);
  return Response.json(true);
}