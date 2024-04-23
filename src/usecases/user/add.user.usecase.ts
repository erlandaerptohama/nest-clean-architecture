import { IException } from '../../domain/interfaces/exception.interface';
import { ILogger } from '../../domain/interfaces/logger.interface';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repo.interface';

import { AddUserDto } from '../../infrastructure/controllers/user/user.dto';

export class AddUserUseCase {
    constructor(private readonly userRepository: IUserRepository, private readonly exception: IException, private readonly logger: ILogger) {}

    async execute(dto: AddUserDto): Promise<UserModel> {
        try {
            const newUser = new UserModel();
            newUser.username = dto.username;
            newUser.name = dto.name;
            newUser.password = dto.password;
            newUser.role = dto.role;
            return await this.userRepository.insert(newUser);
        } catch (error) {
            throw this.exception.internalServerErrorException();
        }
    }
}
