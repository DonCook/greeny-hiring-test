import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Unit} from "../foodProduct/foodIngredient";

@Entity("carbon_emission_factors")
export class CarbonEmissionFactor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  unit: Unit;

  @Column({
    type: "float",
    nullable: false,
  })
  emissionCO2eInKgPerUnit: number;

  @Column({
    nullable: false,
  })
  source: string;

  constructor(props: {
    name: string;
    unit: Unit;
    emissionCO2eInKgPerUnit: number;
    source: string;
  }) {
    super();

    this.name = props?.name;
    this.unit = props?.unit;
    this.emissionCO2eInKgPerUnit = props?.emissionCO2eInKgPerUnit;
    this.source = props?.source;
  }
}
