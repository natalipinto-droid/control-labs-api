import { ICreateUserDTO } from '../dtos/User.dto';
import { User, UserFilters, UserRepository } from './user.respository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<number, User>();
  private nextId = 1;

  public async create(input: ICreateUserDTO): Promise<User> {
    const user: User = {
      ...input,
      id: this.nextId++,
      // Si no se envía 'activo', toma por defecto true (como en el DEFAULT TRUE de la BD)
      activo: input.activo ?? true,
      createdAt: new Date().toISOString()
    };
    this.users.set(user.id, user);
    return { ...user };
  }

  public async findAll(filters: UserFilters = {}): Promise<User[]> {
    return Array.from(this.users.values())
      .filter((user) => {
        // Filtrar por rol si viene en los filtros
        if (filters.rol && user.rol !== filters.rol) {
          return false;
        }
        // Filtrar por activo si viene especificado
        if (filters.activo !== undefined && user.activo !== filters.activo) {
          return false;
        }
        return true;
      })
      .map((user) => ({ ...user }));
  }

  public async findById(id: number): Promise<User | null> {
    const user = this.users.get(id);
    return user ? { ...user } : null;
  }

  public async update(
    id: number,
    input: Partial<ICreateUserDTO>
  ): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }

    const updated: User = {
      ...user,
      ...input
    };

    this.users.set(id, updated);
    return { ...updated };
  }
}