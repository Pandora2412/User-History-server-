import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() data: Log) {
    return this.logsService.create(data);
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Log) {
    return this.logsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.logsService.remove(+id);
  }
}
