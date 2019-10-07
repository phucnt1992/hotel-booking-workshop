import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { EnvironmentService } from '../shared/environment.service';

@Injectable()
export class JwtFactoryService implements JwtOptionsFactory {
  private readonly jwtSecretKey = 'JWT_SECRET';

  constructor(private environmentService: EnvironmentService) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.environmentService.getEnv(this.jwtSecretKey),
      signOptions: { expiresIn: '1h' },
    };
  }
}
