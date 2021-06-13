import { Controller, Get} from '@nestjs/common';
import { HealthService} from "./health.service";
import { HealthCheckResult} from "@nestjs/terminus";

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  public async check(): Promise<HealthCheckResult | undefined> {
    return await this.healthService.check();
  }
}
