import {FoodIngredient} from "./foodIngredient";

export class FoodProduct {
    constructor(
        readonly id: string,
        readonly ingredients: FoodIngredient[]
    ) {}

    toString(): string {
        return `Product [${this.id}]`
    }
}
