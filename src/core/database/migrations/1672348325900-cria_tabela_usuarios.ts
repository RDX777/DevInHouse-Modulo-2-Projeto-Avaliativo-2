import { MigrationInterface, QueryRunner } from "typeorm";

export class criaTabelaUsuarios1672348325900 implements MigrationInterface {
    name = 'criaTabelaUsuarios1672348325900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" SERIAL NOT NULL, "cep" integer NOT NULL, "logradouro" character varying(255) NOT NULL, "numero" integer NOT NULL, "bairro" character varying(255) NOT NULL, "cidade" character varying(255) NOT NULL, "estado" character varying(255) NOT NULL, "complemento" character varying(255), CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nomeCompleto" character varying(255) NOT NULL, "urlFoto" character varying(255) NOT NULL DEFAULT 'http://localhost:3000/foto/fotopadrao.jpg', "email" character varying(255) NOT NULL, "senha" character varying(255) NOT NULL, "salt" character varying(255) NOT NULL, "telefone" character varying(255), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
