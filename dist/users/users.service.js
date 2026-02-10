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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(email, password, username) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('El email ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            username,
            role: 'user',
        });
        return user.save();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async validatePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async updateScore(userId, correct, questionId, selectedOption, correctOption) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.totalAnswered += 1;
        if (correct) {
            user.correctAnswers += 1;
        }
        else {
            user.incorrectAnswers += 1;
        }
        user.answerHistory.push({
            questionId,
            correct,
            selectedOption,
            correctOption,
            timestamp: new Date(),
        });
        if (user.answerHistory.length > 20) {
            user.answerHistory = user.answerHistory.slice(-20);
        }
        return user.save();
    }
    async resetScore(userId) {
        const user = await this.userModel.findByIdAndUpdate(userId, {
            totalAnswered: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            answerHistory: [],
        }, { new: true });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
    async makeAdmin(email) {
        const user = await this.userModel.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map