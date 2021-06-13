import { HealthIndicatorResult } from '@nestjs/terminus';

export interface HealthIndicator {
  name: string;
  callMetrics: any;
  updateProm(isConnected: boolean): void;
  isHealthy(): Promise<HealthIndicatorResult>;
}
