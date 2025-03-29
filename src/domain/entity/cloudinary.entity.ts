import {Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from './product.entity';
import {BrandEntity} from "@Domain/entity/brand.entity";
import {UserEntity} from "@Domain/entity/user.entity";

@Entity('cloudinary')
export class CloudinaryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({name: 'url', type: 'text'})
    url: string;

    @Column({name: 'bytes', type: 'int'})
    bytes: number;

    @Column({name: 'format'})
    format: string;

    //Relationship
    @OneToMany(() => ProductEntity, (item) => item.image)
    productImages: ProductEntity[];

    @OneToOne(() => BrandEntity,(item)=> item.image)
    brandImages: BrandEntity[];

    @OneToOne(() => UserEntity,(item)=> item.avatar)
    user: UserEntity

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    constructor(partial: Partial<CloudinaryEntity>) {
        Object.assign(this, partial);
    }
}
