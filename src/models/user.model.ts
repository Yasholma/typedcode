import { Document, model, Schema } from "mongoose";
import CreateUserDto from "../dtos/create-user.dto";
import { IUser } from "./user.interface";
import { IDataStoredInToken, ITokenData } from "./token-data.interface";
import * as jwt from "jsonwebtoken";

type UserDocument = IUser & Document;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

class User {
  private userModel = model<UserDocument>("User", userSchema);

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(user);
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
