import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecaseProxy';

import { GetAllUserUseCase } from '../../usecases/user/getAll.user.usecase';
import { GetOneUserUseCase } from '../../usecases/user/getOne.user.usecase';
import { AddUserUseCase } from '../../usecases/user/add.user.usecase';
import { UpdateUserUseCase } from '../../usecases/user/update.user.usecase';
import { DeleteUserUseCase } from '../../usecases/user/delete.user.usecase';

import { ExceptionModule } from '../libs/exception/exception.module';
import { ExceptionService } from '../libs/exception/exception.service';
import { LoggerModule } from '../libs/logger/logger.module';
import { LoggerService } from '../libs/logger/logger.service';

import { RepositoryModule } from '../repositories/repository.module';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [LoggerModule, RepositoryModule, ExceptionModule],
})
export class UsecasesProxyModule {

    static GET_ALL_USER_USECASE_PROXY = 'getAllUserUsecaseProxy';
    static GET_ONE_USER_USECASE_PROXY = 'getOneUserUsecaseProxy';
    static ADD_USER_USECASE_PROXY = 'addUserUsecaseProxy';
    static UPDATE_USER_USECASE_PROXY = 'updateUserUsecaseProxy';
    static DELETE_USER_USECASE_PROXY = 'deleteUserUsecaseProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [UserRepository],
                    provide: UsecasesProxyModule.GET_ALL_USER_USECASE_PROXY,
                    useFactory: (
                        repository: UserRepository,
                        exception: ExceptionService,
                        logger: LoggerService
                    ) => new UseCaseProxy(new GetAllUserUseCase(repository, exception, logger)),
                },
                {
                    inject: [UserRepository],
                    provide: UsecasesProxyModule.GET_ONE_USER_USECASE_PROXY,
                    useFactory: (
                        repository: UserRepository,
                        exception: ExceptionService,
                        logger: LoggerService
                    ) => new UseCaseProxy(new GetOneUserUseCase(repository, exception, logger)),
                },
                {
                    inject: [UserRepository],
                    provide: UsecasesProxyModule.ADD_USER_USECASE_PROXY,
                    useFactory: (
                        repository: UserRepository,
                        exception: ExceptionService,
                        logger: LoggerService
                    ) => new UseCaseProxy(new AddUserUseCase(repository, exception, logger)),
                },
                {
                    inject: [UserRepository],
                    provide: UsecasesProxyModule.UPDATE_USER_USECASE_PROXY,
                    useFactory: (
                        repository: UserRepository,
                        exception: ExceptionService,
                        logger: LoggerService
                    ) => new UseCaseProxy(new UpdateUserUseCase(repository, exception, logger)),
                },
                {
                    inject: [UserRepository],
                    provide: UsecasesProxyModule.DELETE_USER_USECASE_PROXY,
                    useFactory: (
                        repository: UserRepository,
                        exception: ExceptionService,
                        logger: LoggerService
                    ) => new UseCaseProxy(new DeleteUserUseCase(repository, exception, logger)),
                },
            ],
            exports: [
                UsecasesProxyModule.GET_ALL_USER_USECASE_PROXY,
                UsecasesProxyModule.GET_ONE_USER_USECASE_PROXY,
                UsecasesProxyModule.ADD_USER_USECASE_PROXY,
                UsecasesProxyModule.UPDATE_USER_USECASE_PROXY,
                UsecasesProxyModule.DELETE_USER_USECASE_PROXY
            ],
        };
    }
}
