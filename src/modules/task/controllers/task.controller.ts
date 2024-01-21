import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskService } from '../services/task.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('task')
@Controller('task')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Task register' })
  @ApiCreatedResponse({
    description: 'Task created',
    type: CreateTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateTaskDto })
  create(@Body() createModuleDto: CreateTaskDto) {
    return this.taskService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Tasks' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({
    name: 'skip',
    type: Number,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: string,
  ) {
    return this.taskService.findAll({
      skip: Number(skip),
      take: Number(take),
      filter: filter,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Task' })
  @ApiOkResponse({ description: 'Get Task', type: CreateTaskDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an Task' })
  @ApiOkResponse({
    description: 'Task updated successfully',
    type: CreateTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() UpdateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, UpdateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Task' })
  @ApiOkResponse({
    description: 'Task deleted successfully',
    type: CreateTaskDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
}
