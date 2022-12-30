import { LocalEntity } from "src/locais/entities/local.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dispositivos" })
export class DispositivoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  nome: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  tipo: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  fabricante: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  informacoes: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  enderecoMAC: string;

  @OneToMany(() => LocalEntity, (local) => local.dispositivo, { cascade: true })
  local: LocalEntity[]

}