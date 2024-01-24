import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/database/PrismaService';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(taskDto: CreateTaskDto) {
    const user = await this.prisma.task.create({
      data: {
        title: taskDto.title,
        description: taskDto.description,
        userId: taskDto.userId,
      },
    });

    return user;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    title?: string;
    description?: string;
    userId?: number;
    createAt?: string;
  }) {
    const { skip, take, title, description, userId, createAt } = params;

    const options = {
      description: {
        contains: description,
      },
      price: {
        contains: title,
      },
      createAt: {
        gte: new Date(createAt),
      },
      userId: userId,
    };

    const data = await this.prisma.task.findMany({
      skip,
      take,
      where: {
        deleteAt: null,
        ...options,
      },
      include: {
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const dataTasks = {
      data: data,
      headers: data.length === 1 ? 1 : data.length,
    };
    return dataTasks;
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      include: {
        user: true,
      },
      where: { id },
    });
  }

  async update(id: number, taskDto: UpdateTaskDto) {
    const company = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`task ${id} does not exist`);
    }

    const updateTask = await this.prisma.task.update({
      data: {
        title: taskDto.title,
        description: taskDto.description,
        userId: taskDto.userId,
      },
      where: { id },
    });

    return updateTask;
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new Error(`task does not exist`);
    }

    return await this.prisma.task.update({
      where: { id },
      data: {
        deleteAt: new Date(),
      },
    });
  }
}
