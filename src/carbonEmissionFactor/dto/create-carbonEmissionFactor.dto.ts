export class CreateCarbonEmissionFactorDto {
  name: string;
  unit: string;
  emissionCO2eInKgPerUnit: number;
  source: string;

  sanitize() {
    if (this.source === "") {
      throw new Error("Source cannot be empty");
    }
  }
}
