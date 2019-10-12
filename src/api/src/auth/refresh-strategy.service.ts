import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { EnvironmentService } from '../shared';

import { User } from './interfaces';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject() environmentService: EnvironmentService) {
    const jwtStrategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: environmentService.getEnv('JWT_REFRESH_SECRET'),
    };
    super(jwtStrategyOptions);
  }

  async validate(payload: any): Promise<User> {
    return {
      id: payload.sub,
      username: payload.username,
      IsAdmin: payload.admin,
    };
  }
}
