import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModule } from '../configs/typeorm/typeorm.module';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmModule, NestTypeOrmModule.forFeature([UserEntity])],
    providers: [UserRepository],
    exports: [UserRepository],
})

export class RepositoryModule {}
