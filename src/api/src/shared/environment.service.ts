import { Injectable } from '@nestjs/common';

import _ from 'lodash';

@Injectable()
export class EnvironmentService {
  nodeEnvKey = 'NODE_ENV';

  public isProdEnv(): boolean {
    return _.isEqual(this.getEnv(this.nodeEnvKey), 'production');
  }

  public isTestEnv(): boolean {
    return _.isEqual(this.getEnv(this.nodeEnvKey), 'test');
  }

  public getEnv(key: string): string {
    return process.env[key];
  }
}
