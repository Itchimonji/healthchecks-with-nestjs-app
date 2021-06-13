import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PrometheusModule } from './prometheus/prometheus.module';
import { AnyOtherModuleModule } from './any-other-module/any-other-module.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [HealthModule, PrometheusModule, AnyOtherModuleModule, MetricsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
