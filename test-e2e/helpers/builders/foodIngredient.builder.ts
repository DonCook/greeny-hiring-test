import {aBigNumber, anIngredientName, aUnit, aUuid} from "../randomData.helper";
import {FoodIngredient, Unit} from "../../../src/foodProduct/foodIngredient";
import {CarbonEmissionFactor} from "../../../src/carbonEmissionFactor/carbonEmissionFactor.entity";
import BigNumber from "bignumber.js";

export class FoodIngredientBuilder {
    private id = aUuid()
    private name = anIngredientName()
    private quantity = aBigNumber()
    private unit = aUnit()

    withName(name: string): FoodIngredientBuilder {
        this.name = name;
        return this;
    }

    withUnit(unit: Unit): FoodIngredientBuilder {
        this.unit = unit;
        return this;
    }

    withQuantity(quantity: BigNumber): FoodIngredientBuilder {
        this.quantity = quantity;
        return this;
    }

    static matching(factor: CarbonEmissionFactor): FoodIngredientBuilder {
        return new FoodIngredientBuilder()
            .withName(factor.name)
            .withUnit(factor.unit);
    }

    build(): FoodIngredient {
        return new FoodIngredient(
            this.id,
            this.name,
            this.quantity,
            this.unit,
        );
    }
}
