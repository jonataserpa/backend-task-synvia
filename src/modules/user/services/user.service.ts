import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/database/PrismaService';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserCreateDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: userDto.name,
          dateborn: userDto.dateborn,
          email: userDto.email,
          phone: userDto.phone,
          radiogender: userDto.radiogender,
          password: hashSync(userDto.password, 10),
        },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        const erro = {
          statusCode: 403,
          name: 'Unique constraint failed on the {constraint}',
          message: 'Email ja existe!',
        };
        throw erro;
      }
      throw new Error();
    }
  }

  async findAll(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.user.findMany();
    } else {
      data = await this.prisma.user.findMany({
        skip,
        take,
        where: {
          name: {
            contains: filter,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    const totalCount = await this.prisma.user.findMany();

    const dataUsers = {
      data,
      headers: totalCount.length === 1 ? 1 : totalCount.length - 1,
    };
    return dataUsers;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, userDto: UpdateModuleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    const updateUser = await this.prisma.user.update({
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone: userDto.phone,
        radiogender: userDto.radiogender,
      },
      where: { id },
    });

    return updateUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
