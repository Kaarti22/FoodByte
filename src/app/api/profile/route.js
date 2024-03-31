import mongoose from "mongoose";
import { authOptions } from "./../auth/[...nextauth]/route";
import { User } from "../../../models/User";
import { getServerSession } from "next-auth";
import { UserInfo } from '../../../models/userinfo';

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const {name, ...otherUserinfo} = data;


  const session = await getServerSession(authOptions);
  const email = session.user.email;

  await User.updateOne({ email }, name);

  await UserInfo.findOneAndUpdate({ email }, otherUserinfo, {upsert: true} );

  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;                                          

  if (!email) return Response.json({});

  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();

  return Response.json({...user,...userInfo});
}
