import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';

@Module({
  providers: [PrometheusService]
})
export class PrometheusModule {}
