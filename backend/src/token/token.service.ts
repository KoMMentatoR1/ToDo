import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import { User } from 'src/models/user.model';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async getDataFromToken(token: string) {
    const tokenMass = token.split(' ');
    if (tokenMass[0] !== 'Bearer') {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.FORBIDDEN,
      );
    }
    let decoded;
    try {
      decoded = verify(tokenMass[1], process.env.PRIVATE_KEY || 'SECRET');
    } catch (e) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.FORBIDDEN,
      );
    }

    return decoded;
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      isActivated: user.isActivated,
    };
    return this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY });
  }
}
