import {FoodProduct} from "../foodProduct/foodProduct";
import BigNumber from "bignumber.js";
import { v4 as uuidv4 } from 'uuid';
import {CarbonEmissionFactor} from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import {CarbonFootprintError} from "./errors/carbon-footprint.error";

export class CarbonFootprint {
    constructor(
        readonly id: string,
        readonly product: FoodProduct,
        readonly agribalyse: BigNumber
    ) {}

    static calculateFrom(product: FoodProduct, factors: CarbonEmissionFactor[]): CarbonFootprint {
        if (!product) throw new CarbonFootprintError("Product not found");
        if (!factors || factors.length === 0) throw new CarbonFootprintError("Carbon Emission Factor not found");

        const footprint = product.ingredients.reduce((acc, ingredient) => {
            const factor = factors.find(f => f.name === ingredient.name && f.unit === ingredient.unit);

            if (!factor) throw new CarbonFootprintError(`Carbon Emission Factor not found for the ${ingredient} in the ${product}`);

            return acc.plus(ingredient.quantity.multipliedBy(factor.emissionCO2eInKgPerUnit));
        }, new BigNumber(0));

        return new CarbonFootprint(
            uuidv4(),
            product,
            footprint
        )
    }
}
