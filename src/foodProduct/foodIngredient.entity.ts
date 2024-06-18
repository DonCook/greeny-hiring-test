import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FoodProductEntity} from "./foodProduct.entity";

@Entity()
export class FoodIngredientEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    unit: string;

    @ManyToOne(() => FoodProductEntity, (product) => product.ingredients, { cascade: true })
    @JoinColumn({ name: "food_product_id" })
    product: FoodProductEntity
}
