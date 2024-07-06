export class CarbonFootprintError extends Error {

    constructor(message: string) {
        super(message + ". The Carbon Footprint could not be calculated.");
    }

}
