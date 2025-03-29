import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {OrderEntity} from "@Domain/entity/order.entity";

@Entity('deliveries')
export class DeliveryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'city'})
    city: string;

    @Column({name: 'district'})
    district: string;

    @Column({name: 'ward'})
    ward: string;

    @Column({name: 'text'})
    text: string;

    @Column({name: 'note', nullable: true})
    note: string;

    //Realationship
    @OneToOne(() => OrderEntity, (item)=> item.delivery)
    order: OrderEntity

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    constructor(partial: Partial<DeliveryEntity>) {
        Object.assign(this, partial);
    }
}
