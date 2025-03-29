import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import {CloudinaryEntity} from './cloudinary.entity';
import {PicklistEntity} from './picklist.entity';
import {BrandEntity} from './brand.entity';
import {CartEntity} from './cart.entity';
import {OrderItemEntity} from './order-item.entity';
import {InventoryEntity} from './inventory.entity';

@Entity('products')
@Unique(['code'])
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // Relationship
    @ManyToOne(() => CloudinaryEntity,(item)=>item.productImages,{eager:true,cascade:true})
    @JoinColumn({name: 'image_id'})
    image: CloudinaryEntity;

    @ManyToMany(() => CloudinaryEntity)
    @JoinTable({
        name: 'product_images',
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "image_id",
            referencedColumnName: "id"
        }})
    images: CloudinaryEntity[];

    @ManyToOne(() => BrandEntity, (item) => item.products)
    @JoinColumn({name: 'brand_id'})
    brand: BrandEntity;

    @ManyToOne(() => PicklistEntity, (item) => item.productsSize)
    @JoinColumn({name: 'size_id'})
    size: PicklistEntity;

    @ManyToOne(() => PicklistEntity, (item) => item.productsGender)
    @JoinColumn({name: 'gender_id'})
    gender: PicklistEntity;

    @ManyToOne(() => PicklistEntity, (item) => item.productsMarketSegment)
    @JoinColumn({name: 'market_segment_id'})
    marketSegment: PicklistEntity;

    @ManyToOne(() => PicklistEntity, (item) => item.productsMovement)
    @JoinColumn({name: 'movement_id'})
    movement: PicklistEntity;

    @ManyToMany(() => PicklistEntity, (item) => item.productsFeature)
    @JoinTable({
        name: "product_features",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "feature_id",
            referencedColumnName: "id"
        }
    })
    features: PicklistEntity[];

    @OneToMany(() => CartEntity, (item) => item.product)
    carts: CartEntity[];

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
    orderItems: OrderItemEntity[];

    @OneToOne(() => InventoryEntity, (inventory) => inventory.product,{cascade:true,eager:true})
    inventory: InventoryEntity;

    //Attributes
    @Column({name: 'name'})
    name: string;

    @Column({name: 'price'})
    price: number;

    @Column({name: 'sales_price'})
    salesPrice: number;

    @Column({name: 'code'})
    code: string;

    @Column({name: 'is_active', default: true})
    isActive: boolean;

    //Base
    @CreateDateColumn({name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp with time zone'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial);
    }
}
