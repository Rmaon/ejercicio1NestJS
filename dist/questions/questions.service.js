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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const question_schema_1 = require("./schemas/question.schema");
let QuestionsService = class QuestionsService {
    constructor(questionModel) {
        this.questionModel = questionModel;
    }
    async onModuleInit() {
        const count = await this.questionModel.countDocuments();
        if (count === 0) {
            await this.seedQuestions();
        }
    }
    async seedQuestions() {
        const initialQuestions = [
            {
                statement: 'El Señor de los Anillos: ¿Cómo se llama el caballo de Gandalf?',
                options: [
                    { index: 0, text: 'Sombra Gris' },
                    { index: 1, text: 'Alazán' },
                    { index: 2, text: 'Ventogris' },
                    { index: 3, text: 'Corcel de Luna' },
                ],
                answerIndex: 0,
                difficulty: 'medium',
            },
            {
                statement: 'El Señor de los Anillos: ¿Qué criatura hiere a Frodo en Amon Sûl?',
                options: [
                    { index: 0, text: 'Un Balrog' },
                    { index: 1, text: 'Un Nazgûl' },
                    { index: 2, text: 'Un Troll de las cavernas' },
                    { index: 3, text: 'Un wargo' },
                ],
                answerIndex: 1,
                difficulty: 'easy',
            },
            {
                statement: 'El Señor de los Anillos: ¿Quién mata a Saruman en la versión extendida?',
                options: [
                    { index: 0, text: 'Gandalf' },
                    { index: 1, text: 'Gríma Lengua de Serpiente' },
                    { index: 2, text: 'Aragorn' },
                    { index: 3, text: 'Legolas' },
                ],
                answerIndex: 1,
                difficulty: 'hard',
            },
            {
                statement: 'Star Wars: ¿Quién dispara primero en la cantina de Mos Eisley?',
                options: [
                    { index: 0, text: 'Greedo' },
                    { index: 1, text: 'Han Solo' },
                    { index: 2, text: 'Ambos a la vez' },
                    { index: 3, text: 'Nadie, es un montaje' },
                ],
                answerIndex: 1,
                difficulty: 'easy',
            },
            {
                statement: 'Star Wars: ¿Cómo se llama el planeta natal de Chewbacca?',
                options: [
                    { index: 0, text: 'Endor' },
                    { index: 1, text: 'Kashyyyk' },
                    { index: 2, text: 'Dagobah' },
                    { index: 3, text: 'Mustafar' },
                ],
                answerIndex: 1,
                difficulty: 'medium',
            },
            {
                statement: 'Star Wars: ¿Quién es el maestro de Obi-Wan Kenobi?',
                options: [
                    { index: 0, text: 'Yoda' },
                    { index: 1, text: 'Qui-Gon Jinn' },
                    { index: 2, text: 'Mace Windu' },
                    { index: 3, text: 'Plo Koon' },
                ],
                answerIndex: 1,
                difficulty: 'easy',
            },
            {
                statement: 'Star Trek: ¿Cómo se llama la nave de la serie original?',
                options: [
                    { index: 0, text: 'USS Discovery' },
                    { index: 1, text: 'USS Enterprise (NCC-1701)' },
                    { index: 2, text: 'USS Voyager' },
                    { index: 3, text: 'USS Defiant' },
                ],
                answerIndex: 1,
                difficulty: 'easy',
            },
            {
                statement: 'Star Trek: ¿Quién es el capitán de la serie original?',
                options: [
                    { index: 0, text: 'Jean-Luc Picard' },
                    { index: 1, text: 'James T. Kirk' },
                    { index: 2, text: 'Benjamin Sisko' },
                    { index: 3, text: 'Christopher Pike' },
                ],
                answerIndex: 1,
                difficulty: 'easy',
            },
            {
                statement: 'Star Trek: ¿Qué especie es Spock?',
                options: [
                    { index: 0, text: 'Humano' },
                    { index: 1, text: 'Klingon' },
                    { index: 2, text: 'Vulcano' },
                    { index: 3, text: 'Andoriano' },
                ],
                answerIndex: 2,
                difficulty: 'easy',
            },
            {
                statement: 'Star Wars: ¿Cómo se llama la orden que inicia la purga Jedi?',
                options: [
                    { index: 0, text: 'Orden 99' },
                    { index: 1, text: 'Orden 13' },
                    { index: 2, text: 'Orden 66' },
                    { index: 3, text: 'Orden 88' },
                ],
                answerIndex: 2,
                difficulty: 'medium',
            },
        ];
        await this.questionModel.insertMany(initialQuestions);
        console.log('✅ Preguntas iniciales cargadas en la base de datos');
    }
    async create(createQuestionDto) {
        const question = new this.questionModel(createQuestionDto);
        return question.save();
    }
    async findAll(difficulty) {
        const filter = difficulty ? { difficulty } : {};
        return this.questionModel.find(filter).exec();
    }
    async findOne(id) {
        const question = await this.questionModel.findById(id).exec();
        if (!question) {
            throw new common_1.NotFoundException(`Pregunta con ID ${id} no encontrada`);
        }
        return question;
    }
    async update(id, updateQuestionDto) {
        const question = await this.questionModel
            .findByIdAndUpdate(id, updateQuestionDto, { new: true })
            .exec();
        if (!question) {
            throw new common_1.NotFoundException(`Pregunta con ID ${id} no encontrada`);
        }
        return question;
    }
    async remove(id) {
        const result = await this.questionModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Pregunta con ID ${id} no encontrada`);
        }
    }
    async getRandomQuestion(difficulty) {
        const filter = difficulty ? { difficulty } : {};
        const count = await this.questionModel.countDocuments(filter);
        if (count === 0) {
            throw new common_1.NotFoundException('No hay preguntas disponibles');
        }
        const random = Math.floor(Math.random() * count);
        const question = await this.questionModel.findOne(filter).skip(random).exec();
        if (!question) {
            throw new common_1.NotFoundException('No se pudo obtener una pregunta');
        }
        return question;
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map