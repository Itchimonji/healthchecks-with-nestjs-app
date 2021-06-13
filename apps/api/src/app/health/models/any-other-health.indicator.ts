import { BaseHealthIndicator } from "./base-health.indicator";
import { HealthIndicator } from "../interfaces/health-indicator.interface";
import { HealthIndicatorResult } from "@nestjs/terminus";
import { PrometheusService } from "../../prometheus/prometheus.service";
import { AnyOtherService } from "../../any-other-module/any-other.service";

export class AnyOtherServiceIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name = 'Any other custom health indicator';
  protected readonly help = 'Status of ' + this.name;

  constructor(private service: AnyOtherService, protected promClientService: PrometheusService) {
    super();
    this.registerMetrics();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = this.service.isConnected;
    this.updateProm(isHealthy);
    return this.getStatus(this.name, isHealthy);
  }
}
