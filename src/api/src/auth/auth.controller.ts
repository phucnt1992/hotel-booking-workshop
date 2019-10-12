import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import _ from 'lodash';

import { AuthService } from './auth.service';
import { LoginFormDto, TokenDto } from './dto';
import { IntrospectResult, Payload, Token, User } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  public async login(@Body() loginFormDto: LoginFormDto): Promise<Token> {
    const account = await this.authService.validateUser(
      loginFormDto.username,
      loginFormDto.password,
    );

    if (_.isEmpty(account)) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.login(account);

    return result;
  }

  @Post('/introspect')
  @UsePipes(ValidationPipe)
  public async introspect(
    @Body() tokenDto: TokenDto,
  ): Promise<IntrospectResult> {
    const payload = await this.authService.verifyAccessToken(tokenDto.token);

    const isActive = !_.isEmpty(payload);

    return {
      isActive,
      sub: isActive ? payload.sub : null,
    };
  }

  @Get('/user-info')
  @UseGuards(AuthGuard('jwt'))
  public async getUserProfile(@Req() req: Request): Promise<User> {
    return req.user as User;
  }

  @Post('/refresh-token')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('refresh'))
  public async refreshToken(@Body() tokenDto: TokenDto): Promise<Token> {
    const payload = await this.authService.verifyRefreshToken(tokenDto.token);

    if (_.isEmpty(payload)) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.login({
      IsAdmin: payload.admin,
      id: payload.sub,
      username: payload.username,
    });

    return result;
  }

  @Post('/revoke-token')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  public async revokeToken(@Body() tokenDto: TokenDto): Promise<void> {}
}
