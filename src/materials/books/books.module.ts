import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [AuthorsModule],
})
export class BooksModule {}
