import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { of } from 'rxjs';
import { join } from 'path';

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
  findOne(@Param('filename') filename: string, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + filename)));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}

//res https://www.youtube.com/watch?v=f-URVd2OKYc
