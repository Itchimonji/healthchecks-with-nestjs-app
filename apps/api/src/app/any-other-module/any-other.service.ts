import {Injectable} from "@nestjs/common";

@Injectable()
export class AnyOtherService {
  public get isConnected(): boolean {
    return true;
  }
}
