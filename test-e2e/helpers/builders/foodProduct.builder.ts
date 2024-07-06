import {aUuid} from "../randomData.helper";
import {FoodProduct} from "../../../src/foodProduct/foodProduct";
import {FoodIngredient} from "../../../src/foodProduct/foodIngredient";
import {FoodIngredientBuilder} from "./foodIngredient.builder";

export class FoodProductBuilder {
    id = aUuid()
    ingredients: FoodIngredient[] = []

    addIngredient(ingredient: FoodIngredient = new FoodIngredientBuilder().build()): FoodProductBuilder {
        this.ingredients.push(ingredient);
        return this;
    }

    build(): FoodProduct {
        return new FoodProduct(
            this.id,
            this.ingredients,
        )
    }
}
