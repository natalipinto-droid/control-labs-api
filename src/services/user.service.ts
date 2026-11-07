import { ICreateUserDTO, RolType } from '../dtos/User.dto';
import { DomainError } from '../errors/domain.errors';
import {
  User,
  UserFilters,
  UserRepository
} from '../repositories/user.respository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(input: ICreateUserDTO): Promise<User> {
    if (!input.email || input.email.trim() === '') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El correo electrónico del usuario es obligatorio.'
      );
    }
    if (!input.nombre || input.nombre.trim() === '') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El nombre del usuario es obligatorio.'
      );
    }

    return this.userRepository.create({
      email: input.email.trim().toLowerCase(),
      nombre: input.nombre.trim(),
      rol: input.rol,
      activo: input.activo
    });
  }

  public async getUsers(filters: UserFilters = {}): Promise<User[]> {
    if (filters.rol !== undefined && !['ADMIN', 'GUARDA', 'INSTRUCTOR'].includes(filters.rol)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro rol no es válido.'
      );
    }
    return this.userRepository.findAll({
      rol: filters.rol,
      activo: filters.activo
    });
  }

  public async getUserDetail(id: number): Promise<User> {
    this.validateId(id);
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }
    return user;
  }

  public async updateUser(
    id: number,
    input: Partial<ICreateUserDTO>
  ): Promise<User> {
    this.validateId(id);

    if (input.email !== undefined && (!input.email || input.email.trim() === '')) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El correo electrónico no puede estar vacío.'
      );
    }

    const updatedUser = await this.userRepository.update(id, {
      ...(input.email && { email: input.email.trim().toLowerCase() }),
      ...(input.nombre && { nombre: input.nombre.trim() }),
      ...(input.rol && { rol: input.rol }),
      ...(input.activo !== undefined && { activo: input.activo })
    });

    if (!updatedUser) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }

    return updatedUser;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del usuario debe ser un entero positivo.'
      );
    }
  }
}