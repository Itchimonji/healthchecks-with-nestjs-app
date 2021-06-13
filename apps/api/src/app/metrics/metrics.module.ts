import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrometheusModule } from '../prometheus/prometheus.module';
import { HealthModule } from '../health/health.module';

@Module({
  providers: [MetricsService],
  controllers: [MetricsController],
  imports: [PrometheusModule, HealthModule]
})
export class MetricsModule {}
