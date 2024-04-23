import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigModule } from '../envConfig/envConfig.module';
import { EnvConfigService } from '../envConfig/envConfig.service';

export const getTypeOrmModuleOptions = (config: EnvConfigService): TypeOrmModuleOptions =>
    ({
        type: 'mysql',
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        synchronize: config.getDatabaseSync(),
        schema: config.getDatabaseSchema(),
        migrationsRun: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
         migrationsDir: 'src/migrations',
        },
    } as TypeOrmModuleOptions);

@Module({
    imports: [
        NestTypeOrmModule.forRootAsync({
            imports: [EnvConfigModule],
            inject: [EnvConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})

export class TypeOrmModule {}
