import {PicklistType} from '@Domain/constants';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ProductEntity} from './product.entity';
import {UserEntity} from './user.entity';

@Entity('picklist')
export class PicklistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => ProductEntity, (product) => product.features)
    productsFeature: ProductEntity[];
    //Product Entity
    @OneToMany(() => ProductEntity, (prod) => prod.size)
    productsSize: ProductEntity[];

    @OneToMany(() => ProductEntity, (prod) => prod.marketSegment)
    productsMarketSegment: ProductEntity[];

    @OneToMany(() => ProductEntity, (prod) => prod.movement)
    productsMovement: ProductEntity[];

    @OneToMany(() => ProductEntity, (prod) => prod.gender)
    productsGender: ProductEntity[];

    //User Entity
    @OneToMany(() => UserEntity, (user) => user.gender)
    usersGender: UserEntity[];

    //Attributes
    @Column({name: 'label'})
    label: string;

    @Column({name: 'type', enum: PicklistType})
    type: PicklistType;

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<PicklistEntity>) {
        Object.assign(this, partial);
    }
}
