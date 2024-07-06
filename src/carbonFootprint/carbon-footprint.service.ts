import {Injectable} from "@nestjs/common";
import {CarbonFootprint} from "./carbonFootprint";
import {FoodProduct} from "../foodProduct/foodProduct";

@Injectable()
export class CarbonFootprintService {
    generateFor(product: FoodProduct): CarbonFootprint {
        return null;
    }
}
