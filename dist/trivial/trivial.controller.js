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
exports.TrivialController = void 0;
const common_1 = require("@nestjs/common");
const trivial_service_1 = require("./trivial.service");
const submit_answer_dto_1 = require("./dto/submit-answer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TrivialController = class TrivialController {
    constructor(trivialService) {
        this.trivialService = trivialService;
    }
    getRandomQuestion(req, difficulty) {
        return this.trivialService.getRandomQuestion(req.user.userId, difficulty);
    }
    submitAnswer(req, submitAnswerDto) {
        return this.trivialService.submitAnswer(req.user.userId, submitAnswerDto);
    }
    getScore(req) {
        return this.trivialService.getScore(req.user.userId);
    }
    resetScore(req) {
        return this.trivialService.resetScore(req.user.userId);
    }
    getHistory(req) {
        return this.trivialService.getHistory(req.user.userId);
    }
};
exports.TrivialController = TrivialController;
__decorate([
    (0, common_1.Get)('question'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TrivialController.prototype, "getRandomQuestion", null);
__decorate([
    (0, common_1.Post)('answer'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, submit_answer_dto_1.SubmitAnswerDto]),
    __metadata("design:returntype", void 0)
], TrivialController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Get)('score'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrivialController.prototype, "getScore", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrivialController.prototype, "resetScore", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrivialController.prototype, "getHistory", null);
exports.TrivialController = TrivialController = __decorate([
    (0, common_1.Controller)('trivial'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [trivial_service_1.TrivialService])
], TrivialController);
//# sourceMappingURL=trivial.controller.js.map