import { Request, Response } from 'express';
import { userService } from '../container';
import { DomainError } from '../errors/domain.errors';
import { ICreateUserDTO, RolType } from '../dtos/User.dto';

export class UserController {
  public static createUser = async (
    req: Request<Record<string, string>, unknown, ICreateUserDTO>,
    res: Response
  ): Promise<void> => {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  };

  public static getUsersByFilter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { rol, activo } = req.query;

    if (rol !== undefined && typeof rol !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro rol debe ser un texto.'
      );
    }

    let parsedActivo: boolean | undefined = undefined;
    if (activo !== undefined) {
      if (activo === 'true') parsedActivo = true;
      else if (activo === 'false') parsedActivo = false;
      else {
        throw new DomainError(
          'VALIDATION_ERROR',
          'El filtro activo debe ser un valor booleano (true o false).'
        );
      }
    }

    const users = await userService.getUsers({
      rol: rol as RolType | undefined,
      activo: parsedActivo
    });
    res.status(200).json({ success: true, data: users });
  };

  public static getUserById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const user = await userService.getUserDetail(Number(req.params.id));
    res.status(200).json({ success: true, data: user });
  };

  public static updateUser = async (
    req: Request<{ id: string }, unknown, Partial<ICreateUserDTO>>,
    res: Response
  ): Promise<void> => {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.status(200).json({ success: true, data: user });
  };
}