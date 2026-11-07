import { ICreateEquiposDTO, TipoEquipo } from '../dtos/equipos.dto';
import { DomainError } from '../errors/domain.errors';
import {
  Equipo,
  EquipoFilters,
  EquipoRepository
} from '../repositories/equipos.repository';

export class EquipoService {
  constructor(private readonly equipoRepository: EquipoRepository) {}

  public async createEquipo(input: ICreateEquiposDTO): Promise<Equipo> {
    if (!input.placaSena || input.placaSena.trim() === '') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'La placa SENA del equipo es obligatoria.'
      );
    }
    if (!input.codigoActivo || input.codigoActivo.trim() === '') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El código activo del equipo es obligatorio.'
      );
    }
    if (!this.isUuid(input.roomId)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El roomId debe ser un UUID válido.'
      );
    }

    const validTipos: TipoEquipo[] = [
      'COMPUTADOR',
      'MOUSE',
      'TECLADO',
      'CARGADOR',
      'TELEVISOR',
      'CONTROL_TV'
    ];
    if (!validTipos.includes(input.tipo)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El tipo de equipo no es válido.'
      );
    }

    return this.equipoRepository.create({
      placaSena: input.placaSena.trim(),
      codigoActivo: input.codigoActivo.trim(),
      tipo: input.tipo,
      roomId: input.roomId.toLowerCase(),
      estado: input.estado
    });
  }

  public async getEquipos(filters: EquipoFilters = {}): Promise<Equipo[]> {
    if (filters.roomId !== undefined && !this.isUuid(filters.roomId)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro roomId debe ser un UUID válido.'
      );
    }
    return this.equipoRepository.findAll({
      roomId: filters.roomId?.toLowerCase(),
      tipo: filters.tipo,
      estado: filters.estado
    });
  }

  public async getEquipoDetail(id: number): Promise<Equipo> {
    this.validateId(id);
    const equipo = await this.equipoRepository.findById(id);
    if (!equipo) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un equipo con identificador ${id}.`
      );
    }
    return equipo;
  }

  public async updateEquipo(
    id: number,
    input: Partial<ICreateEquiposDTO>
  ): Promise<Equipo> {
    this.validateId(id);

    if (input.roomId !== undefined && !this.isUuid(input.roomId)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El roomId debe ser un UUID válido.'
      );
    }

    const updatedEquipo = await this.equipoRepository.update(id, {
      ...(input.placaSena && { placaSena: input.placaSena.trim() }),
      ...(input.codigoActivo && { codigoActivo: input.codigoActivo.trim() }),
      ...(input.tipo && { tipo: input.tipo }),
      ...(input.roomId && { roomId: input.roomId.toLowerCase() }),
      ...(input.estado && { estado: input.estado })
    });

    if (!updatedEquipo) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un equipo con identificador ${id}.`
      );
    }

    return updatedEquipo;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del equipo debe ser un entero positivo.'
      );
    }
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }
}