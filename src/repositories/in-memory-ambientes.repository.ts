import { ICreateAmbientesDTO } from '../dtos/Ambientes.dto';
import { Ambiente, AmbienteFilters, AmbienteRepository } from './ambientes.repository';

export class InMemoryAmbienteRepository implements AmbienteRepository {
  private readonly ambientes = new Map<number, Ambiente>();
  private nextId = 1;

  public async create(input: ICreateAmbientesDTO): Promise<Ambiente> {
    const ambiente: Ambiente = {
      ...input,
      id: this.nextId++,
      // Si no se envía el estado, se asigna 'OPERATIVO' por defecto (como en la BD)
      estado: input.estado ?? 'OPERATIVO',
      createdAt: new Date().toISOString()
    };
    this.ambientes.set(ambiente.id, ambiente);
    return { ...ambiente };
  }

  public async findAll(filters: AmbienteFilters = {}): Promise<Ambiente[]> {
    const normalizedBloque = filters.bloque?.toLowerCase();

    return Array.from(this.ambientes.values())
      .filter((ambiente) => {
        // Filtrar por bloque si viene en los filtros
        if (normalizedBloque && ambiente.bloque.toLowerCase() !== normalizedBloque) {
          return false;
        }
        // Filtrar por estado si viene especificado
        if (filters.estado && ambiente.estado !== filters.estado) {
          return false;
        }
        return true;
      })
      .map((ambiente) => ({ ...ambiente }));
  }

  public async findById(id: number): Promise<Ambiente | null> {
    const ambiente = this.ambientes.get(id);
    return ambiente ? { ...ambiente } : null;
  }

  public async update(
    id: number,
    input: Partial<ICreateAmbientesDTO>
  ): Promise<Ambiente | null> {
    const ambiente = this.ambientes.get(id);
    if (!ambiente) {
      return null;
    }

    const updated: Ambiente = {
      ...ambiente,
      ...input
    };

    this.ambientes.set(id, updated);
    return { ...updated };
  }
}