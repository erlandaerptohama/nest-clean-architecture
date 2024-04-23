import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column('varchar')
    username: string;

    @Column('varchar')
    name: string;

    @Column('text')
    password: string;

    @Column()
    role: number;

    @Column({ default: 1, name: "is_active" })
    isActive: number;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date;
}
