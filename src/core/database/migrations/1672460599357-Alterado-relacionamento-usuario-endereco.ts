import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteradoRelacionamentoUsuarioEndereco1672460599357 implements MigrationInterface {
    name = 'AlteradoRelacionamentoUsuarioEndereco1672460599357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_daa6f9099a4117b84e09226f53e"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_daa6f9099a4117b84e09226f53e"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_daa6f9099a4117b84e09226f53e" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_daa6f9099a4117b84e09226f53e"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_daa6f9099a4117b84e09226f53e" UNIQUE ("endereco_id")`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_daa6f9099a4117b84e09226f53e" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
