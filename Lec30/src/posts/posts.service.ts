import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schema/post.schema';
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    const post = new this.postModel({ ...createPostDto, user: userId });
    const savedPost = await post.save();

    await this.userModel
      .updateOne(
        { _id: userId, posts: { $exists: false } },
        { $set: { posts: [] } },
      )
      .exec();

    await this.userModel
      .findByIdAndUpdate(userId, { $push: { posts: savedPost._id } })
      .exec();
    return savedPost;
  }

  async findAll() {
    return this.postModel.find().populate('user', 'name email').exec();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const post = await this.postModel
      .findById(id)
      .populate('user', 'name email')
      .exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const post = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { returnDocument: 'after' })
      .exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const post = await this.postModel.findByIdAndDelete(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.userModel
      .findByIdAndUpdate(post.user, { $pull: { posts: id } })
      .exec();
    return post;
  }
}
