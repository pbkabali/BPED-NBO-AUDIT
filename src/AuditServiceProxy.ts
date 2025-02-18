import { Injectable, CanActivate } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import config from './Config';

@Injectable()
export class AuditServiceProxy implements CanActivate {
  public client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        ...config.redis.dev
      },
    });
  }

  async canActivate(): Promise<boolean> {
    return true;
  }
}

// export const AuditServiceProxyClient: ClientProxy = new AuditServiceProxy().client;