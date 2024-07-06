import {faker} from "@faker-js/faker";
import {Unit} from "../../src/foodProduct/foodIngredient";
import BigNumber from "bignumber.js";

export function aUuid(): string {
    return faker.string.uuid();
}

export function aNumber(): number {
    return faker.number.int({ min:1, max: 200 });
}

export function aBigNumber(): BigNumber {
    return new BigNumber(aNumber());
}

export function aProductName(): string {
    return faker.commerce.product();
}

export function anIngredientName(): string {
    return faker.commerce.productMaterial();
}

export function aUnit(): Unit {
    return faker.helpers.enumValue(Unit);
}
