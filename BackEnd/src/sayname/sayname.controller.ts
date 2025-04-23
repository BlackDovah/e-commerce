import { Body, Controller, Post } from '@nestjs/common';
import { SayNameDto } from 'src/dto/sayname.dto';
import { SaynameService } from './sayname.service';

@Controller('sayname')
export class SaynameController {
  constructor(private readonly saynameService: SaynameService) {}
  @Post()
  sayMyName(@Body() name: SayNameDto) {
    return this.saynameService.sayMyName(name.name);
  }
}
