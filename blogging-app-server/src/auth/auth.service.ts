import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
    const { password, email } = createAuthDto;

    const user = await this.findUserByEmail(email);
    if (user) throw new UnauthorizedException('User already registered');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await this.userModel.create({
      ...createAuthDto,
      _id: new Types.ObjectId(),
      password: hash,
    });
    const payload = {
      username: createdUser.username,
      email: createdUser.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Unauthorized, Please Sign up');
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const payload = {
        username: user?.username,
        email: user?.email,
      };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
