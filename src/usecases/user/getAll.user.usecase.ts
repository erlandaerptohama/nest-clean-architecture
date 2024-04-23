import { IException } from '../../domain/interfaces/exception.interface';
import { ILogger } from '../../domain/interfaces/logger.interface';
import { UserModelWithoutPassword } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repo.interface';

export class GetAllUserUseCase {
    constructor(private readonly userRepository: IUserRepository, private readonly exception: IException, private readonly logger: ILogger) {}

    async execute(): Promise<Array<UserModelWithoutPassword>> {
        try {
            return await this.userRepository.getAll();
        } catch (error) {
            throw this.exception.internalServerErrorException();
        }
    }
}
