import { IException } from '../../domain/interfaces/exception.interface';
import { ILogger } from '../../domain/interfaces/logger.interface';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repo.interface';

export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository, private readonly exception: IException, private readonly logger: ILogger) {}

    async execute(id: number): Promise<void> {
        try {
            await this.userRepository.deleteById(id);
        } catch (error) {
            throw this.exception.internalServerErrorException();
        }
    }
}
