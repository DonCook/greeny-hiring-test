import BigNumber from "bignumber.js";

export enum Unit {
    KG = 'kg'
}

export class FoodIngredient {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly quantity: BigNumber,
        readonly unit: Unit,
    ) {}

    toString(): string {
        return `Ingredient [name=${this.name} unit=${this.unit}]`
    }
}
