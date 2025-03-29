import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import {CloudinaryEntity, OrderEntity, PicklistEntity} from './index';
import {UserRole} from '@Domain/constants';
import {CartEntity} from './cart.entity';

@Entity('users')
@Unique(['email', 'phoneNumber', 'username'])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({name: 'role', enum: UserRole, default: UserRole.CUSTOMER})
    role: UserRole;

    @Column({name: 'full_name'})
    fullName: string;

    @Column({name: 'birthday', nullable: true})
    birthday: Date;

    @Column({name: 'username',nullable:true})
    username: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'phone_number'})
    phoneNumber: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'refresh_token', nullable: true})
    refreshToken: string;

    //Relationship
    @OneToOne(() => CloudinaryEntity,(item)=> item.user,{cascade: true, eager: true, nullable:true})
    @JoinColumn({name: 'avatar_id'})
    avatar: CloudinaryEntity;

    @ManyToOne(() => PicklistEntity, (item) => item.usersGender,{cascade: true,nullable:true})
    @JoinColumn({name: 'gender_id'})
    gender: PicklistEntity;

    @OneToMany(() => CartEntity, (item) => item.customer)
    carts: CartEntity[];

    @OneToMany(() => OrderEntity, (item) => item.customer)
    order: OrderEntity[];

    @Column({name: 'is_active', default: true})
    isActive: boolean;

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
