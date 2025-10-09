import { Global, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from 'src/generated/prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
