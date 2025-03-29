import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {CloudinaryEntity} from './cloudinary.entity';
import {ProductEntity} from './product.entity';

@Entity('brands')
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({name: 'name'})
    name: string;


    //Relationship
    @OneToMany(() => ProductEntity, (item) => item.brand)
    products: ProductEntity[];

    @OneToOne(() => CloudinaryEntity, {nullable: true, cascade: true, eager: true})
    @JoinColumn({name: 'image_id'})
    image: CloudinaryEntity;

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<BrandEntity>) {
        Object.assign(this, partial);
    }
}
