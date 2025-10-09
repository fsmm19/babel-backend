import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Author } from 'src/generated/prisma/client';

import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.prisma.author.create({
      data: {
        ...createAuthorDto,
        birthDate: createAuthorDto.birthDate
          ? new Date(createAuthorDto.birthDate)
          : undefined,
      },
    });
  }

  async createMany(createAuthorsDto: CreateAuthorDto[]) {
    return await this.prisma.author.createMany({
      data: createAuthorsDto,

      // ...createAuthorDto,
      // birthDate: createAuthorDto.birthDate
      //   ? new Date(createAuthorDto.birthDate)
      //   : undefined,
    });
  }

  async findAll(): Promise<Author[]> {
    return await this.prisma.author.findMany();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.findOne(id);

    return await this.prisma.author.update({
      where: { id },
      data: {
        ...updateAuthorDto,
        birthDate: updateAuthorDto.birthDate
          ? new Date(updateAuthorDto.birthDate)
          : undefined,
      },
    });
  }

  async remove(id: string): Promise<Author> {
    await this.findOne(id);

    return await this.prisma.author.delete({
      where: { id },
    });
  }
}
