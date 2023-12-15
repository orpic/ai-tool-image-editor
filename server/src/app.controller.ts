import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { AwsService } from './aws.service';
import { ONE_HOUR } from './constants/indes';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly awsService: AwsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: any,
  ) {
    const h = JSON.parse(data.data);
    // console.log(h);
    // console.log('Other data:', data.data);
    // console.log('Uploaded image blob:', image.buffer.toString('base64'));
    console.log('Uploaded image:', image);
    const fileBlob = new Blob([image.buffer], {
      type: image.mimetype,
    });

    const formData = new FormData();
    formData.append('file', fileBlob, image.originalname);
    formData.append('data', JSON.stringify(h));
    // console.log(image/);
    // console.log(image, h);
    // console.log('formData', formData);

    const apiKey = process.env.CLAID_API_KEY || 'CLAID_API_KEY';

    try {
      const response = await axios.post(
        'https://api.claid.ai/v1-beta1/image/edit/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // console.log(response.data);
      return {
        code: '200',
        mesage: 'Done',
        data: response.data,
        temp_url: response.data.data.output.tmp_url,
      };
    } catch (error) {
      console.log('error', error);
      // console.log(error);

      return { code: '500', mesage: 'Done', data: error };
    }
  }

  @Post('addbackground')
  @UseInterceptors(FileInterceptor('image'))
  async addBg(@UploadedFile() image: Express.Multer.File, @Body() data: any) {
    const config = JSON.parse(data.data);
    console.log(config);
    const fileBlob = new Blob([image.buffer], {
      type: image.mimetype,
    });

    try {
      const uploadedFileKey = await this.awsService.uploadFileToS3(
        fileBlob,
        image.originalname,
        image.mimetype,
      );

      const expirationTimeInSeconds = 12 * ONE_HOUR;

      const presignedUrl = await this.awsService.generatePresignedUrlForFile(
        uploadedFileKey,
        expirationTimeInSeconds,
      );

      const reqBody = {
        output: {
          number_of_images: 1,
          format: 'png',
        },
        object: {
          image_url: presignedUrl,
        },
        scene: {
          prompt: config?.promp || 'on the wooden table in the dark room',
        },
      };

      const apiKey = process.env.CLAID_API_KEY || 'CLAID_API_KEY';
      const response = await axios.post(
        'https://api.claid.ai/v1-ea/scene/create',
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // console.log(response.data.data.output[0].tmp_url);

      return {
        code: '200',
        message: 'Success',
        presignedUrl,
        data: response.data.data,
        temp_url: response.data.data.output[0].tmp_url,
      };
    } catch (error) {
      console.error(
        'Error uploading file and generating pre-signed URL:',
        error,
      );
      return { code: '500', message: 'Error', data: error.message };
    }
  }
}
