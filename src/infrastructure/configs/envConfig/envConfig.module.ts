import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './envConfig.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './env/.env',
            ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
            isGlobal: true,
        }),
    ],
    providers: [EnvConfigService],
    exports: [EnvConfigService],
})

export class EnvConfigModule {}
