import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocalDispositivo } from "../utils/local.enum";

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
  local: LocalDispositivo;

  @Column({
    type: "varchar",
    length: 255,
  })
  fabricante: string;

  @Column({
    type: "boolean",
  })
  estado: boolean;

  @Column({
    type: "varchar",
    length: 255,
  })
  informacoes: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  enderecoIP: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  enderecoMAC: string;

}