import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, MaterialsModule],
})
export class AppModule {}
