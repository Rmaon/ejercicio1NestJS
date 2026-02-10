import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.password,
      registerDto.username,
    );

    const userObj = user.toObject();
    const payload = {
      sub: userObj._id.toString(),
      email: userObj.email,
      role: userObj.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userObj._id.toString(),
        email: userObj.email,
        username: userObj.username,
        role: userObj.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const userObj = user.toObject();
    const payload = {
      sub: userObj._id.toString(),
      email: userObj.email,
      role: userObj.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userObj._id.toString(),
        email: userObj.email,
        username: userObj.username,
        role: userObj.role,
      },
    };
  }

  async makeAdmin(email: string, secretKey: string) {
    // Este endpoint es temporal para desarrollo
    // En producción debería eliminarse o protegerse mejor
    const expectedKey = process.env.ADMIN_SECRET_KEY || 'make_me_admin_2024';
    
    if (secretKey !== expectedKey) {
      throw new UnauthorizedException('Clave secreta incorrecta');
    }

    const user = await this.usersService.makeAdmin(email);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const userObj = user.toObject();
    return {
      message: 'Usuario convertido a administrador exitosamente',
      user: {
        id: userObj._id.toString(),
        email: userObj.email,
        username: userObj.username,
        role: userObj.role,
      },
    };
  }
}
