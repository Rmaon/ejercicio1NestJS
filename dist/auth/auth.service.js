"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const user = await this.usersService.create(registerDto.email, registerDto.password, registerDto.username);
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
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales incorrectas');
        }
        const isPasswordValid = await this.usersService.validatePassword(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales incorrectas');
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
    async makeAdmin(email, secretKey) {
        const expectedKey = process.env.ADMIN_SECRET_KEY || 'make_me_admin_2024';
        if (secretKey !== expectedKey) {
            throw new common_1.UnauthorizedException('Clave secreta incorrecta');
        }
        const user = await this.usersService.makeAdmin(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map