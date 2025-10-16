import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorsService } from '../authors/authors.service';
import { Book } from 'src/generated/prisma/client';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorsService: AuthorsService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title, subtitle, authors, ...bookData } = createBookDto;
    const materialData = { title, subtitle };
    const connectedAuthors: { id: string }[] = [];

    return await this.prisma.$transaction(async (tx) => {
      for (const author of authors || []) {
        if (author.id) {
          const existing = await this.authorsService.findOne(author.id);
          connectedAuthors.push({ id: existing.id });
        } else if (author.data) {
          const newAuthor = await this.authorsService.create(author.data);
          connectedAuthors.push({ id: newAuthor.id });
        }
      }

      const book = await tx.book.create({
        data: {
          bibliographicMaterial: {
            create: {
              ...materialData,
              type: 'BOOK',
              authors: {
                connect: connectedAuthors,
              },
            },
          },
          ...bookData,
        },
        include: {
          bibliographicMaterial: {
            include: {
              authors: true,
            },
          },
        },
      });

      return book;
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

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
