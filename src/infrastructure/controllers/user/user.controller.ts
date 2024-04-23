import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SwaggerResponse } from '../../commons/swagger/swagger.response.decorator';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';
import { UseCaseProxy } from '../../usecaseProxy/usecaseProxy';
import { UsecasesProxyModule } from '../../usecaseProxy/usecaseProxy.module';

import { GetAllUserUseCase } from '../../../usecases/user/getAll.user.usecase';
import { GetOneUserUseCase } from '../../../usecases/user/getOne.user.usecase';
import { AddUserUseCase } from '../../../usecases/user/add.user.usecase';
import { UpdateUserUseCase } from '../../../usecases/user/update.user.usecase';
import { DeleteUserUseCase } from '../../../usecases/user/delete.user.usecase';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
    constructor(
        @Inject(UsecasesProxyModule.GET_ALL_USER_USECASE_PROXY)
        private readonly getAllUserUseCaseProxy: UseCaseProxy<GetAllUserUseCase>,
        @Inject(UsecasesProxyModule.GET_ONE_USER_USECASE_PROXY)
        private readonly getOneUserUseCaseProxy: UseCaseProxy<GetOneUserUseCase>,
        @Inject(UsecasesProxyModule.ADD_USER_USECASE_PROXY)
        private readonly addUserUseCaseProxy: UseCaseProxy<AddUserUseCase>,
        @Inject(UsecasesProxyModule.UPDATE_USER_USECASE_PROXY)
        private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCase>,
        @Inject(UsecasesProxyModule.DELETE_USER_USECASE_PROXY)
        private readonly deleteUserUseCaseProxy: UseCaseProxy<DeleteUserUseCase>,
    ) {}

    @Get("all")
    @SwaggerResponse(UserPresenter, true)
    async getAllUser() {
        const users = await this.getAllUserUseCaseProxy.getInstance().execute();
        return users.map((user) => new UserPresenter(user));
    }

    @Get()
    @SwaggerResponse(UserPresenter, false)
    async getOneUser(@Query('id', ParseIntPipe) id: number) {
        const user = await this.getOneUserUseCaseProxy.getInstance().execute(id);
        return new UserPresenter(user);
    }

    @Post()
    @SwaggerResponse(UserPresenter, false)
    async addUser(@Body() dto: AddUserDto) {
        const user = await this.addUserUseCaseProxy.getInstance().execute(dto);
        return new UserPresenter(user);
    }

    @Put()
    @SwaggerResponse(UserPresenter, true)
    async updateUser(@Query('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        await this.updateUserUseCaseProxy.getInstance().execute(id, dto);
        return 'success';
    }

    @Delete()
    @SwaggerResponse(UserPresenter, false)
    async deleteUser(@Query('id', ParseIntPipe) id: number) {
        await this.deleteUserUseCaseProxy.getInstance().execute(id);
        return 'success';
    }
}
