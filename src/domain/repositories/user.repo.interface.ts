import { UserModel } from "../models/user.model";

export interface IUserRepository {
    getAll(): Promise<Array<UserModel>>;
    getById(id: number): Promise<UserModel>;
    insert(user: UserModel): Promise<UserModel>;
    update(id: number, user: Partial<UserModel>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
