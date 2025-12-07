import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimentationsService } from './movimentations.service';
import { CreateMovimentationDto } from './dto/create-movimentation.dto';

@Controller('movimentations')
export class MovimentationsController {
  constructor(private readonly movimentationsService: MovimentationsService) { }

  @Post('entry')
  createEntry(@Body() dto: CreateMovimentationDto) {
    return this.movimentationsService.createEntry({
      ...dto,
      type: 'entry',
    });
  }

  @Post('output')
  createOutput(@Body() dto: CreateMovimentationDto) {
    return this.movimentationsService.createOutput({
      ...dto,
      type: 'output',
    });
  }

  @Get('entry')
  findAllEntry(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.movimentationsService.findAllByType('entry', {
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }


  // @Get('output')
  // findAllByOutput() {
  //   return this.movimentationsService.findAllByType('output');
  // }
}
