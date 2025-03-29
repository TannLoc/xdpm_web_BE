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
    UpdateDateColumn
} from 'typeorm';
import {UserEntity} from './user.entity';
import {DeliveryEntity} from './delivery.entity';
import {OrderState} from '@Domain/constants';
import {OrderItemEntity} from '@Domain/entity/order-item.entity';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({type: 'enum', enum: OrderState, name: 'state', default: OrderState.WAITING_CONFIRM})
    state: OrderState;

    @Column({name: 'code'})
    code: string;

    @Column({name: 'total_bill'})
    totalBill: number;

    @Column({name: 'total_quantity'})
    totalQuantity: number;

    //Relationship
    @OneToMany(() => OrderItemEntity, (item) => item.order,{cascade:true})
    items: OrderItemEntity[];

    @ManyToOne(() => UserEntity, (item) => item.order)
    @JoinColumn({name: 'customer_id'})
    customer: UserEntity;

    @OneToOne(() => DeliveryEntity, (item)=> item.order,{cascade:true})
    @JoinColumn({name: 'delivery_id'})
    delivery: DeliveryEntity;

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<OrderEntity>) {
        Object.assign(this, partial);
    }
}
