import { ExampleCodeService } from '@api/example/code/example-code.service';
import { Controller, Query } from '@nestjs/common';

import {
  GetCodeRequestDto,
  GetCodeResponseDto,
} from '@api/example/code/dto/get-code.dto';
import { GetCode } from '@api/example/code/example-code.decorator';

@Controller('/example')
export class ExampleCodeController {
  constructor(protected readonly exampleCodeService: ExampleCodeService) {}

  @GetCode()
  getCode(@Query() getCodeRequestDto: GetCodeRequestDto) {
    return new GetCodeResponseDto({
      message: this.exampleCodeService.get(getCodeRequestDto.userId),
    });
  }
}
