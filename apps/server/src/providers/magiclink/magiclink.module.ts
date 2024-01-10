import { Module } from '@nestjs/common';
import { MagicLinkRepository } from './magiclink.repository';

@Module({
  providers: [MagicLinkRepository],
  exports: [MagicLinkRepository],
})
export class MagiclinkModule {}
