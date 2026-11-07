import { ICreateEquiposDTO, TipoEquipo, EstadoEquipo } from '../dtos/equipos.dto';

export interface Equipo extends ICreateEquiposDTO {
  id: number;
  estado: EstadoEquipo; // Asegura que en la entidad devuelta el estado siempre esté definido
  createdAt: string;
}

export interface EquipoFilters {
  roomId?: string;
  tipo?: TipoEquipo;
  estado?: EstadoEquipo;
}

export interface EquipoRepository {
  create(input: ICreateEquiposDTO): Promise<Equipo>;
  findAll(filters?: EquipoFilters): Promise<Equipo[]>;
  findById(id: number): Promise<Equipo | null>;
  update(
    id: number,
    input: Partial<ICreateEquiposDTO>
  ): Promise<Equipo | null>;
}