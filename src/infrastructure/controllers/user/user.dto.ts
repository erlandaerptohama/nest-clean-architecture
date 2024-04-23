import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddUserDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly role: number;
}

export class UpdateUserDto {    
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    readonly name: string;
    
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    readonly password: string;
    
    @ApiProperty({ required: true })
    @IsOptional()
    @IsNumber()
    readonly role: number;
}
