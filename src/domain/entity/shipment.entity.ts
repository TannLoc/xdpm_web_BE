import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {InventoryEntity} from './inventory.entity';

@Entity('shipments')
export class ShipmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({name: 'quantity'})
    quantity: number;

    @Column({name: 'import_date'})
    importDate: Date;

    //Relationship
    @ManyToOne(() => InventoryEntity, (item) => item.shipments,{cascade:true, eager:true    })
    @JoinColumn({name: 'inventory_id'})
    inventory: InventoryEntity;

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<ShipmentEntity>) {
        Object.assign(this, partial);
    }
}
