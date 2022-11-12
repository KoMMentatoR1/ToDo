import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
    async getDataFromToken(token: string) {
        const tokenMass = token.split(" ")
        if(tokenMass[0] !== "Bearer") {
          throw new HttpException('Пользователь не авторизован', HttpStatus.FORBIDDEN);
        }
        let decoded;
        try{
          decoded = verify(tokenMass[1], process.env.PRIVATE_KEY || 'SECRET');
        }
        catch(e){
          throw new HttpException('Пользователь не авторизован', HttpStatus.FORBIDDEN);
        }

        return decoded
    }
}