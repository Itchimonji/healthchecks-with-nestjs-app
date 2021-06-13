import {Injectable, Logger} from '@nestjs/common';
import {HealthCheck, HealthCheckResult, HealthCheckService, HttpHealthIndicator} from "@nestjs/terminus";
import {PrometheusService} from "../prometheus/prometheus.service";
import {AnyOtherService} from "../any-other-module/any-other.service";
import { HealthIndicator } from './interfaces/health-indicator.interface';
import {GoogleHealthIndicator} from "./models/google-health.indicator";
import {AnyOtherServiceIndicator} from "./models/any-other-health.indicator";


@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(private health: HealthCheckService,
              private http: HttpHealthIndicator,
              private promClientService: PrometheusService,
              private anyOtherService: AnyOtherService) {
    this.listOfThingsToMonitor = [
      new GoogleHealthIndicator(this.http, 'www.google.de', this.promClientService),
      new AnyOtherServiceIndicator(this.anyOtherService, this.promClientService)
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {

    return await this.health.check(
      this.listOfThingsToMonitor.map(apiIndicator => async () => {
        try {
          return await apiIndicator.isHealthy();
        } catch (e) {
          Logger.warn(e);
          apiIndicator.updateProm(false);
          return {};
        }
      })
    );
  }
}
