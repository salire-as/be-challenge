import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  _id?: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document<Types.ObjectId>;
