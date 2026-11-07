import { ICreateUserDTO, RolType } from '../dtos/User.dto';

export interface User extends ICreateUserDTO {
  id: number;
  createdAt: string;
}

export interface UserFilters {
  rol?: RolType;
  activo?: boolean;
}

export interface UserRepository {
  create(input: ICreateUserDTO): Promise<User>;
  findAll(filters?: UserFilters): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  update(
    id: number,
    input: Partial<ICreateUserDTO>
  ): Promise<User | null>;
}