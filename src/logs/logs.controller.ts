import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './entities/log.entity';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@ApiTags('User Logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}
  @Get()
  @ApiOperation({summary: 'Get all logs'})
  @ApiResponse({
    status: 200,
    description: 'get all logs successfully',
  })
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Enter unique id',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'get successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
  })
  @ApiOperation({summary: 'Get logs specified by id'})
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(+id);
  }

  @Post()
  @ApiOperation({summary: 'Create new log'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'id',
          required: ['true'],
        },
        action: {
          type: 'string',
          description: 'user\'s activity',
          required: ['true'],
        },
        time: {
          type: 'time',
          description: 'time when activity happened',
          required: ['true'],
        }
      },
      example: {
        "id": 5,
        "action": "Follow Beauty",
        "time": "15:00 2023-04-04"
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'add new log successfully',
  })
  create(@Body() data: Log) {
    return this.logsService.create(data);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update log specified by id'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Enter unique id',
    required: true
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          description: 'user\'s activity',
          required: ['true'],
        },
        time: {
          type: 'time',
          description: 'time when activity happened',
          required: ['true'],
        }
      },
      example: {
        "action": "Log in",
	      "time": "11:00 2023-04-04",
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'update log successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'log not found',
  })
  update(@Param('id') id: string, @Body() data: Log) {
    return this.logsService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Remove log specified by id'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Enter unique id',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'delete successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
  })
  remove(@Param('id') id: number) {
    return this.logsService.remove(+id);
  }
}
