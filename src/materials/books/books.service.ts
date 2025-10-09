import { Injectable } from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const { title, subtitle, type, authors, isbn13, edition, numberOfPages } =
      createBookDto;

    const materialData = { title, subtitle, type, authors };

    // return await this.prisma.book.create({
    //   data: {
    //     bibliographicMaterial: {
    //       create: {
    //         ...materialData,
    //         authors: {
    //           connectOrCreate: authors.map(author => ({
    //             where: {id: author.},
    //             create: {}
    //           }))
    //         }
    //       },
    //     },
    //   },
    // });
  }

  findAll() {
    return `This action returns all books`;
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
