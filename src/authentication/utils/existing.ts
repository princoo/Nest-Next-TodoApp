import { Model } from "mongoose";
import { User } from "src/shcemas/user.schema";


 interface ReturnedUser{
    email: string;
  }
export async function getUserByEmail(email:string,userModel:Model<User>): Promise<ReturnedUser>{
    const data = await userModel.findOne({email})
    return data
}