import { Injectable } from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from 'src/generated/prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title, subtitle, type, authors, isbn13, edition, numberOfPages } =
      createBookDto;

    const materialData = { title, subtitle, type, authors };
    const bookData = { isbn13, edition, numberOfPages };

    return await this.prisma.book.create({
      data: {
        bibliographicMaterial: {
          create: {
            ...materialData,
            authors: {
              connectOrCreate: authors.map((author) => ({
                where: {
                  firstName_middleName_lastName_nationality: {
                    firstName: author.firstName,
                    middleName: author.middleName ?? '',
                    lastName: author.lastName,
                    nationality: author.nationality ?? '',
                  },
                },
                create: {
                  ...author,
                  middleName: author.middleName ?? '',
                  nationality: author.nationality ?? '',
                  birthDate: author.birthDate
                    ? new Date(author.birthDate)
                    : undefined,
                },
              })),
            },
          },
        },
        ...bookData,
      },
      include: {
        bibliographicMaterial: true,
      },
    });
  }

  findAll(): Promise<Book[]> {
    return this.prisma.book.findMany({
      include: {
        bibliographicMaterial: {
          include: { authors: true },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
