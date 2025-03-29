import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from './product.entity';
import {UserEntity} from './user.entity';

@Entity('carts')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({name: 'quantity', default: 1})
    quantity: number;

    //Relationship
    @ManyToOne(() => UserEntity, (user) => user.carts)
    @JoinColumn({name: 'customer_id'})
    customer: UserEntity;

    @ManyToOne(() => ProductEntity, (item) => item.carts,{eager: true})
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial);
    }
}
