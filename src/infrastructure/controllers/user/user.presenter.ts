import { ApiProperty } from '@nestjs/swagger';
import { UserModelWithoutPassword } from '../../../domain/models/user.model';

export class UserPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    role: number;

    constructor(user: UserModelWithoutPassword) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.role = user.role;
    }
}
