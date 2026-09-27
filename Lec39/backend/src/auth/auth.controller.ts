import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './DTO/sign-up.dto';
import { SignInDto } from './DTO/sing-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from '../decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SingUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  currentUser(@User() userId: string) {
    return this.authService.currentUser(userId);
  }
}
