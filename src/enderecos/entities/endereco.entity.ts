import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "enderecos" })
export class EnderecoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "integer",
  })
  cep: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  logradouro: string;

  @Column()
  numero: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  bairro: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  cidade: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  estado: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  complemento: string;

  // @OneToOne(() => UsuarioEntity, (usuarioEntity) => usuarioEntity.endereco)
  // usuario: UsuarioEntity

  @OneToMany(() => UsuarioEntity, (usuarioEntity) => usuarioEntity.endereco, { cascade: true })
  usuario: UsuarioEntity




}