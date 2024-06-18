import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FoodIngredientEntity} from "./foodIngredient.entity";

@Entity()
export class FoodProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => FoodIngredientEntity, (foodIngredient) => foodIngredient)
    ingredients: FoodIngredientEntity[]
}
