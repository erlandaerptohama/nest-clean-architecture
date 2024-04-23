import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecaseProxy/usecaseProxy.module';
import { UserController } from './user/user.controller';

@Module({
    imports: [UsecasesProxyModule.register()],
    controllers: [UserController],
})
export class ControllerModule {}
