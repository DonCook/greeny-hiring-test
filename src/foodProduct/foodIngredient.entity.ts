import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FoodProductEntity} from "./foodProduct.entity";
import {FoodIngredient, Unit} from "./foodIngredient";
import {DomainEntity} from "../shared/domain.base-entity";
import BigNumber from "bignumber.js";

@Entity()
export class FoodIngredientEntity extends BaseEntity implements DomainEntity<FoodIngredient>{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    unit: Unit;

    @ManyToOne(() => FoodProductEntity, (product) => product.ingredients, { cascade: true })
    @JoinColumn({ name: "food_product_id" })
    product: FoodProductEntity

    static from(foodIngredient: FoodIngredient): FoodIngredientEntity {
        const e = new FoodIngredientEntity();

        e.id = foodIngredient.id
        e.name = foodIngredient.name
        e.quantity = foodIngredient.quantity.toNumber()
        e.unit = foodIngredient.unit

        return e;
    }

    toDomain(): FoodIngredient {
        return new FoodIngredient(
            this.id,
            this.name,
            new BigNumber(this.quantity),
            this.unit
        )
    }
}
