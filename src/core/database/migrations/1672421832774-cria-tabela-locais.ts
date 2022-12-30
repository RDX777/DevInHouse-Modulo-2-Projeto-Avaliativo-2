import { MigrationInterface, QueryRunner } from "typeorm";

export class criaTabelaLocais1672421832774 implements MigrationInterface {
    name = 'criaTabelaLocais1672421832774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."locais_local_enum" AS ENUM('Sotao', 'Sacada', 'Varanda', 'Porao', 'Banheiro', 'Quarto', 'Sala de jantar', 'Sala de estar', 'Sala de entrada', 'Garagem', 'Corredor')`);
        await queryRunner.query(`CREATE TABLE "locais" ("id" SERIAL NOT NULL, "local" "public"."locais_local_enum", "estado" boolean NOT NULL DEFAULT false, "enderecoIP" character varying(255), "usuario_id" integer, "dispositivo_id" integer, CONSTRAINT "PK_42eaed01557782613d36365d300" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "locais" ADD CONSTRAINT "FK_eea93206b492787855e434c13c4" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locais" ADD CONSTRAINT "FK_1324c9118cf2208afefa2d5545f" FOREIGN KEY ("dispositivo_id") REFERENCES "dispositivos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locais" DROP CONSTRAINT "FK_1324c9118cf2208afefa2d5545f"`);
        await queryRunner.query(`ALTER TABLE "locais" DROP CONSTRAINT "FK_eea93206b492787855e434c13c4"`);
        await queryRunner.query(`DROP TABLE "locais"`);
        await queryRunner.query(`DROP TYPE "public"."locais_local_enum"`);
    }

}
