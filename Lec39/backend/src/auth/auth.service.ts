import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SingUpDto } from './DTO/sign-up.dto';
import { SignInDto } from './DTO/sing-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SingUpDto) {
    const hashedPass = await bcrypt.hash(signUpDto.password, 10);
    await this.usersService.create({ ...signUpDto, password: hashedPass });

    return { message: 'User created successfully' };
  }

  async signIn(signInDto: SignInDto) {
    const existingUser = await this.usersService.findOneByEmail(
      signInDto.email,
    );
    if (!existingUser) throw new BadGatewayException('Account not found');

    const isPassEqual = await bcrypt.compare(
      signInDto.password,
      existingUser.password,
    );
    if (!isPassEqual) throw new BadGatewayException('invalid credentials');

    const payload = {
      userId: existingUser._id,
      role: existingUser.role,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1hr',
    });

    return accessToken;
  }

  currentUser(userId: string) {
    return this.usersService.findOne(userId);
  }
}
