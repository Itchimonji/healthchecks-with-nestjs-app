import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from '../prometheus/prometheus.module';
import { AnyOtherModuleModule } from '../any-other-module/any-other-module.module';

@Module({
  imports: [TerminusModule, PrometheusModule, AnyOtherModuleModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
