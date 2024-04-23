import { Module } from '@nestjs/common';

import { EnvConfigModule } from './infrastructure/configs/envConfig/envConfig.module';
import { LoggerModule } from './infrastructure/libs/logger/logger.module';
import { ExceptionModule } from './infrastructure/libs/exception/exception.module';
import { UsecasesProxyModule } from './infrastructure/usecaseProxy/usecaseProxy.module';
import { ControllerModule } from './infrastructure/controllers/controller.module';

@Module({
  imports: [
    EnvConfigModule,
    LoggerModule,
    ExceptionModule,
    UsecasesProxyModule.register(),
    ControllerModule,
  ],
  providers: [],
})

export class AppModule {}
