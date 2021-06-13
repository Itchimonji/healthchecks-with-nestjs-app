import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Histogram } from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

interface MapHistogram {
  [key: string]: Histogram<string>;
}

@Injectable()
export class PrometheusService {
  private readonly serviceTitle = 'atlas-backend';
  private registeredMetrics: MapHistogram = {};
  private readonly registry: Registry;

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  constructor() {
    this.registry = new Registry();
    this.registry.setDefaultLabels({
      app: this.serviceTitle
    });
    collectDefaultMetrics({ register: this.registry });
  }

  public registerMetrics(name: string, help: string, labelNames: string[], buckets: number[]): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  public removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  public clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }
}
