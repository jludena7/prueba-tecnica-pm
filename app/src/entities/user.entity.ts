import { ObjectId } from "mongodb";

export interface UserEntity extends Document {
  _id?: ObjectId;

  email: string;

  password: string;

  name: string;
}
