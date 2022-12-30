import { MigrationInterface, QueryRunner } from "typeorm";

export class criaTabelaDispositivos1672370355703 implements MigrationInterface {
    name = 'criaTabelaDispositivos1672370355703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dispositivos" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "tipo" character varying(255) NOT NULL, "fabricante" character varying(255) NOT NULL, "informacoes" character varying(255) NOT NULL, "enderecoMAC" character varying(255) NOT NULL, CONSTRAINT "PK_e9595bb1be0bf2b2e376b904434" PRIMARY KEY ("id"))`);

        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "fabricante", "informacoes", "enderecoMAC") VALUES ('Lâmpada 10W', 'Lâmpada', 'Intelbras', 'Lâmpada: 10 W', '00:1B:44:11:3A:B8')`);
        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "fabricante", "informacoes", "enderecoMAC") VALUES ('Lâmpada 15W', 'Lâmpada', 'Intelbras', 'Lâmpada: 15 W', '00:1B:44:11:3A:B9')`);
        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "fabricante", "informacoes", "enderecoMAC") VALUES ('Lâmpada 20W', 'Lâmpada', 'Intelbras', 'Lâmpada: 20 W', '00:1B:44:11:3A:C0')`);
        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "fabricante", "informacoes", "enderecoMAC") VALUES ('Lâmpada 25W', 'Lâmpada', 'Intelbras', 'Lâmpada: 25 W', '00:1B:44:11:3A:C1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dispositivos"`);
    }

}
