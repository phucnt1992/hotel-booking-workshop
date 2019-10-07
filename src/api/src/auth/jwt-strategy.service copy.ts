import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { EnvironmentService } from '../shared';

import { Payload, User } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject() environmentService: EnvironmentService) {
    const jwtStrategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentService.getEnv('JWT_SERECT'),
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
