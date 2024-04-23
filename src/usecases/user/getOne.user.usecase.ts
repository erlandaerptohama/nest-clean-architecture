import { IException } from '../../domain/interfaces/exception.interface';
import { ILogger } from '../../domain/interfaces/logger.interface';
import { UserModelWithoutPassword } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repo.interface';

export class GetOneUserUseCase {
    constructor(private readonly userRepository: IUserRepository, private readonly exception: IException, private readonly logger: ILogger) {}

    async execute(id: number): Promise<UserModelWithoutPassword> {
        try {
            return await this.userRepository.getById(id);
        } catch (error) {
            throw this.exception.internalServerErrorException();
        }
    }
}
