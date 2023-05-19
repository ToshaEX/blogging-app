import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/schemas/auth.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  getAllPosts(@Query('search') searchStr: string) {
    return this.postService.findAll(searchStr);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  getUserPosts(@GetUser() user: User) {
    return this.postService.getPostsByUser(user);
  }

  @Get('/:id')
  async findPostByID(@Param('id') id: string) {
    return await this.postService.findPostByID(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ) {
    const post = await this.postService.findPostByID(id);
    if (!post) throw new BadRequestException('Post not found');
    if (post.author._id.toHexString() !== user._id.toHexString())
      throw new UnauthorizedException('Unauthorized action');
    return this.postService.updatePost(post, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
