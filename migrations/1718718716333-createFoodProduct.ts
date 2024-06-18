import {MigrationInterface, QueryRunner} from "typeorm";

export class $migrationName1718718716333 implements MigrationInterface {
    name = ' $migrationName1718718716333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_ingredient_entity" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying NOT NULL, 
            "quantity" integer NOT NULL, 
            "unit" character varying NOT NULL, 
            "food_product_id" uuid, CONSTRAINT "PK_1c7fa1b0f945c11ed0486ac7359" PRIMARY KEY ("id")
        )`);
        await queryRunner.query(`CREATE TABLE "food_product_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_d82ade9a87d9076da8e3bce1536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food_ingredient_entity" ADD CONSTRAINT "FK_5a8a12912793765ed913340542f" FOREIGN KEY ("food_product_id") REFERENCES "food_product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_ingredient_entity" DROP CONSTRAINT "FK_5a8a12912793765ed913340542f"`);
        await queryRunner.query(`DROP TABLE "food_product_entity"`);
        await queryRunner.query(`DROP TABLE "food_ingredient_entity"`);
    }

}
