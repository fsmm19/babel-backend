import { Module } from '@nestjs/common';

import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService],
  imports: [BooksModule, AuthorsModule],
})
export class MaterialsModule {}
