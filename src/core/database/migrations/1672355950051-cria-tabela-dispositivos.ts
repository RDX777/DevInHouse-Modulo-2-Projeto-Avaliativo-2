import { MigrationInterface, QueryRunner } from "typeorm";

export class criaTabelaDispositivos1672355950051 implements MigrationInterface {
    name = 'criaTabelaDispositivos1672355950051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dispositivos" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "tipo" character varying(255) NOT NULL, "local" character varying(255) NOT NULL, "fabricante" character varying(255) NOT NULL, "estado" boolean NOT NULL, "informacoes" character varying(255) NOT NULL, "enderecoIP" character varying(255) NOT NULL, "enderecoMAC" character varying(255) NOT NULL, CONSTRAINT "PK_e9595bb1be0bf2b2e376b904434" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_dispositivos" ("usuariosId" integer NOT NULL, "dispositivosId" integer NOT NULL, CONSTRAINT "PK_bfdbabb99d6236549b58a77fd64" PRIMARY KEY ("usuariosId", "dispositivosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1caa29788f4dc6b629bfb0a30" ON "usuario_dispositivos" ("usuariosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02d3654dad64f3348ae2dcfbe6" ON "usuario_dispositivos" ("dispositivosId") `);
        await queryRunner.query(`ALTER TABLE "usuario_dispositivos" ADD CONSTRAINT "FK_e1caa29788f4dc6b629bfb0a30f" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuario_dispositivos" ADD CONSTRAINT "FK_02d3654dad64f3348ae2dcfbe62" FOREIGN KEY ("dispositivosId") REFERENCES "dispositivos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "local", "fabricante", "estado", "informacoes", "enderecoIP", "enderecoMAC") VALUES ('Lâmpada 10W', 'Lâmpada', 'Sótão', 'Intelbras', 'true', 'Lâmpada: 10 W', '192.168.0.101', '00:1B:44:11:3A:B8')`);
        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "local", "fabricante", "estado", "informacoes", "enderecoIP", "enderecoMAC") VALUES ('Lâmpada 15W', 'Lâmpada', 'Sala de jantar', 'Intelbras', 'true', 'Lâmpada: 15 W', '192.168.0.102', '00:1B:44:11:3A:B9')`);
        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "local", "fabricante", "estado", "informacoes", "enderecoIP", "enderecoMAC") VALUES ('Lâmpada 20W', 'Lâmpada', 'Garagem', 'Intelbras', 'true', 'Lâmpada: 20 W', '192.168.0.103', '00:1B:44:11:3A:C0')`);
        await queryRunner.query(`INSERT INTO "public"."dispositivos" ("nome", "tipo", "local", "fabricante", "estado", "informacoes", "enderecoIP", "enderecoMAC") VALUES ('Lâmpada 25W', 'Lâmpada', 'Corredor', 'Intelbras', 'false', 'Lâmpada: 25 W', '192.168.0.104', '00:1B:44:11:3A:C1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_dispositivos" DROP CONSTRAINT "FK_02d3654dad64f3348ae2dcfbe62"`);
        await queryRunner.query(`ALTER TABLE "usuario_dispositivos" DROP CONSTRAINT "FK_e1caa29788f4dc6b629bfb0a30f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02d3654dad64f3348ae2dcfbe6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1caa29788f4dc6b629bfb0a30"`);
        await queryRunner.query(`DROP TABLE "usuario_dispositivos"`);
        await queryRunner.query(`DROP TABLE "dispositivos"`);
    }

}
