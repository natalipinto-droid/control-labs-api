import { ICreateEquiposDTO } from '../dtos/equipos.dto';
import { Equipo, EquipoFilters, EquipoRepository } from './equipos.repository';

export class InMemoryEquipoRepository implements EquipoRepository {
  private readonly equipos = new Map<number, Equipo>();
  private nextId = 1;

  public async create(input: ICreateEquiposDTO): Promise<Equipo> {
    const equipo: Equipo = {
      ...input,
      id: this.nextId++,
      // Si no se envía el estado, se asigna 'OPERATIVO' por defecto (como en la BD)
      estado: input.estado ?? 'OPERATIVO',
      createdAt: new Date().toISOString()
    };
    this.equipos.set(equipo.id, equipo);
    return { ...equipo };
  }

  public async findAll(filters: EquipoFilters = {}): Promise<Equipo[]> {
    const normalizedRoomId = filters.roomId?.toLowerCase();
    
    return Array.from(this.equipos.values())
      .filter((equipo) => {
        // Filtrar por roomId si viene en los filtros
        if (normalizedRoomId && equipo.roomId.toLowerCase() !== normalizedRoomId) {
          return false;
        }
        // Filtrar por tipo si viene especificado
        if (filters.tipo && equipo.tipo !== filters.tipo) {
          return false;
        }
        // Filtrar por estado si viene especificado
        if (filters.estado && equipo.estado !== filters.estado) {
          return false;
        }
        return true;
      })
      .map((equipo) => ({ ...equipo }));
  }

  public async findById(id: number): Promise<Equipo | null> {
    const equipo = this.equipos.get(id);
    return equipo ? { ...equipo } : null;
  }

  public async update(
    id: number,
    input: Partial<ICreateEquiposDTO>
  ): Promise<Equipo | null> {
    const equipo = this.equipos.get(id);
    if (!equipo) {
      return null;
    }

    const updated: Equipo = {
      ...equipo,
      ...input
    };

    this.equipos.set(id, updated);
    return { ...updated };
  }
}