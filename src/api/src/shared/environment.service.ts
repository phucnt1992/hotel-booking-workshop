import { Injectable } from '@nestjs/common';

import _ from 'lodash';

@Injectable()
export class EnvironmentService {
  private readonly nodeEnv = process.env.NODE_ENV;

  public isProdEnv(): boolean {
    return _.isEqual(this.nodeEnv, 'production');
  }

  public isTestEnv(): boolean {
    return _.isEqual(this.nodeEnv, 'test');
  }
}
