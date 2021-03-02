import { Document, model } from "mongoose";
import CreateUserDto from "../../dtos/create-user.dto";
import { IUser } from "./user.interface";
import { IDataStoredInToken, ITokenData } from "./token-data.interface";
import * as jwt from "jsonwebtoken";
import { userSchema } from "./user.schema";
import { POST, USER } from "../../constants";
import { PostDocument } from "../post/post.model";
import { postSchema } from "../post/post.schema";

type UserDocument = IUser & Document;

class User {
  private userModel = model<UserDocument>(USER, userSchema);
  private postModel = model<PostDocument>(POST, postSchema);

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async getAllUserPosts(user: IUser): Promise<PostDocument[]> {
    return this.postModel.find({ author: user._id });
  }

  createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default User;
