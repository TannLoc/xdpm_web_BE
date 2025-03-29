import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from './product.entity';
import {ShipmentEntity} from './shipment.entity';

@Entity('inventories')
export class InventoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //Relationship
    @OneToOne(() => ProductEntity, (item) => item.inventory)
    @JoinColumn({name: 'product_id'})
    product: ProductEntity;

    @ManyToOne(() => ShipmentEntity, (item) => item.inventory)
    shipments: ShipmentEntity[];

    //Attributes
    @Column({name: 'stock', default: 0})
    stock: number;

    @Column({name: 'sold', default: 0})
    sold: number;

    @Column({name: 'import', default: 0})
    import: number;

    constructor(partial: Partial<InventoryEntity>) {
        Object.assign(this, partial);
    }
}
