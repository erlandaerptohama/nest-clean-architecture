import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repo.interface';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAll(): Promise<UserModel[]> {
        const userEntity = await this.userRepository.find();
        return userEntity.map(user => this.mapToModel(user));
    }

    async getById(id: number): Promise<UserModel> {
        const userEntity = await this.userRepository.findOne({ where: { id } });
        return this.mapToModel(userEntity);
    }

    async insert(userModel: UserModel): Promise<UserModel> {
        const result = await this.userRepository.insert(this.mapToEntity(userModel));
        return this.mapToModel(result.generatedMaps[0] as UserEntity);
    }

    async update(id: number, user: Partial<UserModel>): Promise<void> {
        await this.userRepository.update({ id }, user);
    }

    async deleteById(id: number): Promise<void> {
        await this.userRepository.delete({ id });
    }

    private mapToModel(userEntity: UserEntity): UserModel {

        if (!userEntity) return null;

        const user = new UserModel();

        user.id = userEntity.id;
        user.username = userEntity.username;
        user.name = userEntity.name;
        user.password = userEntity.password;
        user.role = userEntity.role;
        user.isActive = userEntity.isActive;

        return user;
    }

    private mapToEntity(userModel: UserModel): UserEntity {

        if (!userModel) return null;

        const userEntity = new UserEntity();

        userEntity.id = userModel.id;
        userEntity.username = userModel.username;
        userEntity.name = userModel.name;
        userEntity.password = userModel.password;
        userEntity.role = userModel.role;
        userEntity.isActive = userModel.isActive;
        userEntity.createdDate = new Date();
        userEntity.updatedDate = new Date();

        return userEntity;
    }
}
