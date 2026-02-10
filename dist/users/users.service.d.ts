import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(email: string, password: string, username: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    updateScore(userId: string, correct: boolean, questionId: string, selectedOption: number, correctOption: number): Promise<UserDocument>;
    resetScore(userId: string): Promise<UserDocument>;
    makeAdmin(email: string): Promise<UserDocument>;
}
