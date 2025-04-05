import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderPaymentType, PaymentState } from "@Domain/constants";

@Entity('payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

 
    @Column({
        name: 'type',
        type: 'enum',
        enum: OrderPaymentType,
        default: OrderPaymentType.CASH
    })
    type: OrderPaymentType

    @Column({
        name: 'state',
        type: 'enum',
        enum: PaymentState,
        default: PaymentState.PROCESSING
    })
    state: PaymentState

    @CreateDateColumn({name: 'payment_at', type: 'timestamp with time zone', nullable: true})
    paymentAt: Date;

  //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<PaymentEntity>) {
        Object.assign(this, partial);
    }
}