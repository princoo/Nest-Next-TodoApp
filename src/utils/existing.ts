import { Model } from "mongoose";
import { User } from "src/models/user.schema";


 interface ReturnedUser{
    email: string;
    username: string;
    password: string
  }
export async function getUserByEmail(email:string,userModel:Model<User>): Promise<ReturnedUser | null>{
    const data = await userModel.findOne({email})
    if(data){
      return {
        email: data.email,
        username: data.username,
        password:data.password
      }
    }
    else{
      return null;
    }

}