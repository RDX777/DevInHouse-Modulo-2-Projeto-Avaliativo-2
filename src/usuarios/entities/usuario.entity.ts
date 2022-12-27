import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuarios" })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  nomeCompleto: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "http://localhost:3000/foto/fotopadrao.jpg"
  })
  urlFoto: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  senha: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  salt: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  telefone: string;

  @Column({ type: "boolean", default: true })
  status: boolean;

}