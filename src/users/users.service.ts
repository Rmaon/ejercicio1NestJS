import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(email: string, password: string, username: string): Promise<UserDocument> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = new this.userModel({
      email,
      password: hashedPassword,
      username,
      role: 'user',
    });

    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateScore(
    userId: string,
    correct: boolean,
    questionId: string,
    selectedOption: number,
    correctOption: number,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.totalAnswered += 1;
    if (correct) {
      user.correctAnswers += 1;
    } else {
      user.incorrectAnswers += 1;
    }

    // Añadir al histórico (mantener solo las últimas 20)
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

  async resetScore(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        totalAnswered: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        answerHistory: [],
      },
      { new: true },
    );

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  async makeAdmin(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true },
    );

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }
}
