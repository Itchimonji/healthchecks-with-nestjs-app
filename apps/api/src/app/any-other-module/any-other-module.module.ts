import { Module } from '@nestjs/common';
import { AnyOtherService } from './any-other.service';

@Module({
  providers: [AnyOtherService],
  exports: [AnyOtherService],
})
export class AnyOtherModuleModule {}
