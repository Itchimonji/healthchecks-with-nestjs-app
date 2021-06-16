import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PrometheusModule } from './prometheus/prometheus.module';
import { AnyOtherModuleModule } from './any-other-module/any-other-module.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'dist/apps/yuna'),
    }),
    ConfigModule.forRoot({ cache: true }),
    HealthModule,
    PrometheusModule,
    AnyOtherModuleModule,
    MetricsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
