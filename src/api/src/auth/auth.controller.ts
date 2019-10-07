import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import _ from 'lodash';

import { AuthService } from './auth.service';
import { LoginFormDto, TokenDto } from './dto';
import { IntrospectResult, Payload, Token, User } from './interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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
    const verify = (await this.authService.verifyAccessToken(
      tokenDto.token,
    )) as Payload;

    const isActive = !_.isEmpty(verify);

    return {
      isActive,
      sub: isActive ? verify.sub : null,
    };
  }

  @Get('/user-info')
  @UseGuards(AuthGuard('jwt'))
  public async getUserProfile(@Req() req: Request): Promise<User> {
    return req.user as User;
  }

  @Post('/refresh-token')
  @UsePipes(ValidationPipe)
  public async refreshToken(): Promise<Token> {

  }
}
