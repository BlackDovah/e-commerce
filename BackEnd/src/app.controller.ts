import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerDto } from './dto/app.dto';
import { SumServiceService } from './sum-service/sum-service.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sumService: SumServiceService,
  ) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({
      res: this.appService.getHello(),
    });
  }

  @Get('/sum')
  getSum(@Query('num1') a: string, @Query('num2') b: string) {
    return this.sumService.getSum(a, b);
  }

  @Get('/query')
  getQueryStrings(@Query('name') username, @Query('age') age): string {
    return `Hello ${username}, you are ${age} years old.`;
  }

  @Get('/id/:id')
  getRouteParam(@Param('id') userID): string {
    return `${userID} found `;
  }

  @Get('/askquestion')
  askQuestion(): string {
    return `How-are-you?`;
  }

  @Post('/answer')
  answer(
    @Body() getAnswerDto: AnswerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let response: string;
    let status: number;
    if (getAnswerDto.answer === 'yes') {
      response = 'It is yes';
      status = 200;
    } else {
      throw new BadRequestException();
    }
    res.status(status).json({
      res: response,
    });
  }
}
