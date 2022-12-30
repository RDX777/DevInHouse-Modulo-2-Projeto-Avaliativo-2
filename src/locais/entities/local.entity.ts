import { DispositivoEntity } from "src/dispositivos/entities/dispositivo.entity";
import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalDispositivo } from "../utils/local.enum";

@Entity({ name: "locais" })
export class LocalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @ManyToOne(() => DispositivoEntity, (dispositivo) => dispositivo.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'dispositivo_id' })
  dispositivo: DispositivoEntity;

  @Column({
    type: "enum",
    enum: LocalDispositivo,
    default: null
  })
  local: LocalDispositivo;

  @Column({
    default: false
  })
  estado: boolean;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  enderecoIP: string;

}