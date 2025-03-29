import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from './product.entity';
import {OrderEntity} from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({name: 'quantity'})
    quantity: number;

    @Column({name: 'sale_price'})
    salePrice: number;

    //Relationship
    @ManyToOne(() => OrderEntity, (order) => order.items)
    @JoinColumn({name: 'order_id'})
    order: OrderEntity;

    @ManyToOne(() => ProductEntity,(item)=>item.orderItems,{cascade:true, eager:true})
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    constructor(partial: Partial<OrderItemEntity>) {
        Object.assign(this, partial);
    }
}
