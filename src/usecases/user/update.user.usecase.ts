import { IException } from '../../domain/interfaces/exception.interface';
import { ILogger } from '../../domain/interfaces/logger.interface';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repo.interface';

import { UpdateUserDto } from '../../infrastructure/controllers/user/user.dto';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository, private readonly exception: IException, private readonly logger: ILogger) {}

    async execute(id: number, dto: UpdateUserDto): Promise<void> {
        try {
            const newUser = new UserModel();

            if (dto.name) { newUser.name = dto.name; }
            if (dto.password) { newUser.password = dto.password; }
            if (dto.role) { newUser.role = dto.role; }

            await this.userRepository.update(id, newUser);
        } catch (error) {
            throw this.exception.internalServerErrorException();
        }
    }
}
