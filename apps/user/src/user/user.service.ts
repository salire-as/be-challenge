import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly users: Model<UserDocument>,
  ) { }

  getById(id: Types.ObjectId) {
    return this.users.findById(id);
  }

  list() {
    return this.users.find();
  }
}
