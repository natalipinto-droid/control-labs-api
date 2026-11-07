import { ICreateAmbientesDTO, EstadoAmbiente } from '../dtos/Ambientes.dto';
import { DomainError } from '../errors/domain.errors';
import {
  Ambiente,
  AmbienteFilters,
  AmbienteRepository
} from '../repositories/ambientes.repository';

export class AmbienteService {
  constructor(private readonly ambienteRepository: AmbienteRepository) {}

  public async createAmbiente(input: ICreateAmbientesDTO): Promise<Ambiente> {
    if (!input.nombre || input.nombre.trim() === '') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El nombre del ambiente es obligatorio.'
      );
    }
    if (!input.bloque || input.bloque.trim() === '') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El bloque del ambiente es obligatorio.'
      );
    }
    if (!Number.isInteger(input.capacidadPcs) || input.capacidadPcs < 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'La capacidad de PCs debe ser un número entero mayor o igual a 0.'
      );
    }

    const validEstados: EstadoAmbiente[] = ['OPERATIVO', 'MANTENIMIENTO', 'INACTIVO'];
    if (input.estado !== undefined && !validEstados.includes(input.estado)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El estado del ambiente no es válido.'
      );
    }

    return this.ambienteRepository.create({
      nombre: input.nombre.trim(),
      bloque: input.bloque.trim(),
      capacidadPcs: input.capacidadPcs,
      estado: input.estado
    });
  }

  public async getAmbientes(filters: AmbienteFilters = {}): Promise<Ambiente[]> {
    const validEstados: EstadoAmbiente[] = ['OPERATIVO', 'MANTENIMIENTO', 'INACTIVO'];
    if (filters.estado !== undefined && !validEstados.includes(filters.estado)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado no es válido.'
      );
    }

    return this.ambienteRepository.findAll({
      bloque: filters.bloque?.trim(),
      estado: filters.estado
    });
  }

  public async getAmbienteDetail(id: number): Promise<Ambiente> {
    this.validateId(id);
    const ambiente = await this.ambienteRepository.findById(id);
    if (!ambiente) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un ambiente con identificador ${id}.`
      );
    }
    return ambiente;
  }

  public async updateAmbiente(
    id: number,
    input: Partial<ICreateAmbientesDTO>
  ): Promise<Ambiente> {
    this.validateId(id);

    if (input.nombre !== undefined && (!input.nombre || input.nombre.trim() === '')) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El nombre no puede estar vacío.'
      );
    }
    if (input.bloque !== undefined && (!input.bloque || input.bloque.trim() === '')) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El bloque no puede estar vacío.'
      );
    }
    if (input.capacidadPcs !== undefined && (!Number.isInteger(input.capacidadPcs) || input.capacidadPcs < 0)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'La capacidad de PCs debe ser un número entero mayor o igual a 0.'
      );
    }

    const validEstados: EstadoAmbiente[] = ['OPERATIVO', 'MANTENIMIENTO', 'INACTIVO'];
    if (input.estado !== undefined && !validEstados.includes(input.estado)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El estado no es válido.'
      );
    }

    const updatedAmbiente = await this.ambienteRepository.update(id, {
      ...(input.nombre && { nombre: input.nombre.trim() }),
      ...(input.bloque && { bloque: input.bloque.trim() }),
      ...(input.capacidadPcs !== undefined && { capacidadPcs: input.capacidadPcs }),
      ...(input.estado && { estado: input.estado })
    });

    if (!updatedAmbiente) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un ambiente con identificador ${id}.`
      );
    }

    return updatedAmbiente;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del ambiente debe ser un entero positivo.'
      );
    }
  }
}