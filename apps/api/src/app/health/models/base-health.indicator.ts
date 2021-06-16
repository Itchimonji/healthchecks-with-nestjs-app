import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import {
  PrometheusHistogram,
  PrometheusService,
} from '../../prometheus/prometheus.service';
import { Logger } from '@nestjs/common';

// Design Pattern: Template Method

const TAG = 'HealthCheck';

export abstract class BaseHealthIndicator extends HealthIndicator {
  public abstract name: string;
  public callMetrics: any;

  protected abstract help: string;
  protected abstract readonly promClientService: PrometheusService | undefined;
  protected readonly labelNames = ['status'];
  protected readonly buckets = [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10];
  protected stateHealthy = false;

  private _isRegistered = false;

  protected registerMetrics(): void {
    if (this.promClientService) {
      this._isRegistered = true;
      const histogram: PrometheusHistogram = this.promClientService.registerMetrics(
        this.name,
        this.help,
        this.labelNames,
        this.buckets
      );
      this.callMetrics = histogram.startTimer();
    }
  }

  protected isDefined(value: string | undefined): boolean {
    return !!value;
  }

  public updateProm(isConnected: boolean): void {
    if (this.stateHealthy !== isConnected) {
      if (isConnected === true) {
        Logger.log(this.name + ' is available', TAG, true);
      }
      this.stateHealthy = isConnected;
      this.callMetrics({ status: this.stateHealthy ? 1 : 0 });
    }
  }

  public abstract isHealthy(): Promise<HealthIndicatorResult>;

  public reportUnhealthy(): HealthIndicatorResult {
    this.updateProm(false);
    return this.getStatus(this.name, false);
  }

  public get isRegistered(): boolean {
    return this._isRegistered;
  }
}
