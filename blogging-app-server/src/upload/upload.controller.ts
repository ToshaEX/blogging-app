import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { of } from 'rxjs';
import { join } from 'path';
import * as fs from 'fs';
import { JwtAuthGuard } from 'src/auth/auth.guard';

const dirPath = join(process.cwd(), 'uploads/');

const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const filename = uuid() + file.originalname;
      callback(null, `${filename}`);
    },
  }),
};

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File upload failed');
    }
    return of({ imagePath: file.filename });
  }

  @Get('/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(dirPath + filename);
    const isExists = fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
    if (!isExists) throw new NotFoundException('Image not found');
    return of(res.sendFile(filePath));
  }

  @Delete('/:filename')
  @UseGuards(JwtAuthGuard)
  async deleteFIle(@Param('filename') filename: string) {
    const filePath = join(dirPath + filename);
    const isExists = fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
    if (!filename || !isExists) {
      throw new NotFoundException('Image not found');
    }

    return await fs.promises.unlink(filePath);
  }
}
