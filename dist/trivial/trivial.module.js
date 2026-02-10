"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrivialModule = void 0;
const common_1 = require("@nestjs/common");
const trivial_service_1 = require("./trivial.service");
const trivial_controller_1 = require("./trivial.controller");
const questions_module_1 = require("../questions/questions.module");
const users_module_1 = require("../users/users.module");
let TrivialModule = class TrivialModule {
};
exports.TrivialModule = TrivialModule;
exports.TrivialModule = TrivialModule = __decorate([
    (0, common_1.Module)({
        imports: [questions_module_1.QuestionsModule, users_module_1.UsersModule],
        controllers: [trivial_controller_1.TrivialController],
        providers: [trivial_service_1.TrivialService],
    })
], TrivialModule);
//# sourceMappingURL=trivial.module.js.map