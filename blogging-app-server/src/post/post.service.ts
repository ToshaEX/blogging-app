import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User) {
    return await this.postModel.create({
      ...createPostDto,
      _id: new Types.ObjectId(),
      author: user,
    });
  }

  async findAll(searchStr: string): Promise<User[]> {
    const searchRegex = new RegExp(searchStr, 'i');

    const authors = await this.userModel.find({
      username: { $regex: searchRegex },
    });

    const authorIds = authors.map((author) => author._id);

    return await this.postModel
      .find({
        $or: [
          { author: { $in: authorIds } },
          { title: { $regex: searchRegex } },
        ],
      })
      .sort('-create_at')
      .populate('author', ['username', 'create_at'], User.name);
  }

  async findPostByID(_id: string) {
    const post = await this.postModel
      .findById(new Types.ObjectId(_id))
      .populate('author', ['username', 'create_at'], User.name);
    return post;
  }

  async updatePost(post: Post, updatePostDto: UpdatePostDto) {
    Object.assign(post, updatePostDto);

    return await this.postModel.updateOne({ _id: post._id }, post, {
      upsert: true,
    });
  }

  async deletePost(id: string) {
    return await this.postModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async getPostsByUser(user: User) {
    return await this.postModel
      .find({ author: user._id })
      .sort('-create_at')
      .populate('author', ['username', 'create_at'], User.name);
  }
}
