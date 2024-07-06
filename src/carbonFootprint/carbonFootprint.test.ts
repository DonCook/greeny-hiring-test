import {FoodProductBuilder} from "../../test-e2e/helpers/builders/foodProduct.builder";
import {FoodIngredientBuilder} from "../../test-e2e/helpers/builders/foodIngredient.builder";
import {getTestEmissionFactor, TEST_CARBON_EMISSION_FACTORS} from "../seed-dev-data";
import {CarbonEmissionFactor} from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import BigNumber from "bignumber.js";
import {FoodProduct} from "../foodProduct/foodProduct";
import {CarbonFootprint} from "./carbonFootprint";

describe("CarbonFootprint", () => {
    const hamFactor: CarbonEmissionFactor  = getTestEmissionFactor('ham');
    const cheeseFactor = getTestEmissionFactor('cheese');

    describe("calculateFrom", () => {
        it("should throw an error if the product is null", () => {
            expect(() => CarbonFootprint.calculateFrom(null as unknown as FoodProduct, TEST_CARBON_EMISSION_FACTORS))
                .toThrow("Product not found. The Carbon Footprint could not be calculated.")
        });

        it("should throw an error if the emission factors are null", () => {
            expect(() => CarbonFootprint.calculateFrom(new FoodProductBuilder().build(), null as unknown as CarbonEmissionFactor[]))
                .toThrow("Carbon Emission Factor not found. The Carbon Footprint could not be calculated.")
        });

        it("should throw an error if there are no emission factor", () => {
            expect(() => CarbonFootprint.calculateFrom(new FoodProductBuilder().build(), []))
                .toThrow("Carbon Emission Factor not found. The Carbon Footprint could not be calculated.")
        });

        it ('should return the product of origin in the footprint', () => {
            const product = new FoodProductBuilder()
                .addIngredient(FoodIngredientBuilder.matching(hamFactor).build())
                .build();

            expect(CarbonFootprint.calculateFrom(product, TEST_CARBON_EMISSION_FACTORS).product).toStrictEqual(product);
        })

        it("should return an emission agribalyse of 0 when there is no ingredients", () => {
            expect(CarbonFootprint.calculateFrom(
                new FoodProductBuilder().build(), TEST_CARBON_EMISSION_FACTORS).agribalyse.toNumber()
            ).toBe(0);
        })

        describe("when the product has only one ingredient", () => {
            it ('should throw an error if there is no factor matching the ingredient', () => {
                const unknownProduct = new FoodProductBuilder()
                    .addIngredient()
                    .build()

                expect(() => CarbonFootprint.calculateFrom(unknownProduct, TEST_CARBON_EMISSION_FACTORS))
                    .toThrow(
                        `Carbon Emission Factor not found for the Ingredient [name=${unknownProduct.ingredients[0].name} unit=${unknownProduct.ingredients[0].unit}] in the Product [${unknownProduct.id}]`
                    )
            })

            it("should generate an Agribalyse of the ingredient quantity times its carbon emission factor", () => {
                const uniqueIngredient = FoodIngredientBuilder
                    .matching(hamFactor)
                    .withQuantity(new BigNumber('3'))
                    .build()

                expect(CarbonFootprint.calculateFrom(
                    new FoodProductBuilder()
                        .addIngredient(uniqueIngredient)
                        .build(),
                    TEST_CARBON_EMISSION_FACTORS
                ).agribalyse.toNumber()).toBe(0.33)
            })
        })

        describe("when the food product has several ingredients", () => {
            it ('should throw an error if there is no factor matching one of the ingredient', () => {
                const unknownProduct = new FoodProductBuilder()
                    .addIngredient(FoodIngredientBuilder.matching(hamFactor).build())
                    .addIngredient(FoodIngredientBuilder.matching(cheeseFactor).build())
                    .addIngredient()
                    .build()

                expect(() => CarbonFootprint.calculateFrom(unknownProduct, TEST_CARBON_EMISSION_FACTORS))
                    .toThrow(
                        `Carbon Emission Factor not found for the Ingredient [name=${unknownProduct.ingredients[2].name} unit=${unknownProduct.ingredients[2].unit}] in the Product [${unknownProduct.id}]`
                    )
            })

            it ("should return the carbon footprint of the product when all ingredients have their factors", () => {
                const ham = FoodIngredientBuilder
                    .matching(hamFactor)
                    .withQuantity(new BigNumber('3'))
                    .build()

                const cheese = FoodIngredientBuilder
                    .matching(cheeseFactor)
                    .withQuantity(new BigNumber('1.5'))
                    .build()

                const tomato = FoodIngredientBuilder
                    .matching(getTestEmissionFactor('tomato'))
                    .withQuantity(new BigNumber('1.5'))
                    .build()

                expect(CarbonFootprint.calculateFrom(
                    new FoodProductBuilder()
                        .addIngredient(ham)
                        .addIngredient(cheese)
                        .addIngredient(tomato)
                        .build(),
                    TEST_CARBON_EMISSION_FACTORS
                ).agribalyse.toNumber()).toBe(0.705)
            })
        })
    })
})
