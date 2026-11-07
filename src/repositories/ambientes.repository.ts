import { ICreateAmbientesDTO, EstadoAmbiente } from '../dtos/Ambientes.dto';

export interface Ambiente extends ICreateAmbientesDTO {
  id: number;
  estado: EstadoAmbiente; // Asegura que en la entidad devuelta el estado siempre esté definido
  createdAt: string;
}

export interface AmbienteFilters {
  bloque?: string;
  estado?: EstadoAmbiente;
}

export interface AmbienteRepository {
  create(input: ICreateAmbientesDTO): Promise<Ambiente>;
  findAll(filters?: AmbienteFilters): Promise<Ambiente[]>;
  findById(id: number): Promise<Ambiente | null>;
  update(
    id: number,
    input: Partial<ICreateAmbientesDTO>
  ): Promise<Ambiente | null>;
}