import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FoodIngredientEntity} from "./foodIngredient.entity";
import {FoodProduct} from "./foodProduct";
import {DomainEntity} from "../shared/domain.base-entity";

@Entity()
export class FoodProductEntity extends BaseEntity implements DomainEntity<FoodProduct>{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => FoodIngredientEntity, (foodIngredient) => foodIngredient)
    ingredients: FoodIngredientEntity[];

    static from(foodProduct: FoodProduct): FoodProductEntity {
        const e = new FoodProductEntity();
        e.id = foodProduct.id
        e.ingredients = foodProduct.ingredients.map(FoodIngredientEntity.from);
        return e;
    }

    toDomain(): FoodProduct {
        return new FoodProduct(
            this.id,
            this.ingredients.map(e => e.toDomain())
        )
    }
}
