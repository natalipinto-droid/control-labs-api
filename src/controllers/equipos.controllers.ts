import { Request, Response } from 'express';
import { equipoService } from '../container';
import { DomainError } from '../errors/domain.errors';
import { ICreateEquiposDTO, TipoEquipo, EstadoEquipo } from '../dtos/equipos.dto';

export class EquipoController {
  public static createEquipo = async (
    req: Request<Record<string, string>, unknown, ICreateEquiposDTO>,
    res: Response
  ): Promise<void> => {
    const equipo = await equipoService.createEquipo(req.body);
    res.status(201).json({ success: true, data: equipo });
  };

  public static getEquiposByFilter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { roomId, tipo, estado } = req.query;

    if (roomId !== undefined && typeof roomId !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro roomId debe ser un texto.'
      );
    }

    if (tipo !== undefined && typeof tipo !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro tipo debe ser un texto.'
      );
    }

    if (estado !== undefined && typeof estado !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado debe ser un texto.'
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

    if (tipo !== undefined && !validTipos.includes(tipo as TipoEquipo)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro tipo no es válido.'
      );
    }

    const validEstados: EstadoEquipo[] = [
      'OPERATIVO',
      'MANTENIMIENTO',
      'FUERA_DE_SERVICIO'
    ];

    if (estado !== undefined && !validEstados.includes(estado as EstadoEquipo)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado no es válido.'
      );
    }

    const equipos = await equipoService.getEquipos({
      roomId,
      tipo: tipo as TipoEquipo | undefined,
      estado: estado as EstadoEquipo | undefined
    });

    res.status(200).json({ success: true, data: equipos });
  };

  public static getEquipoById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const equipo = await equipoService.getEquipoDetail(Number(req.params.id));
    res.status(200).json({ success: true, data: equipo });
  };

  public static updateEquipo = async (
    req: Request<{ id: string }, unknown, Partial<ICreateEquiposDTO>>,
    res: Response
  ): Promise<void> => {
    const equipo = await equipoService.updateEquipo(Number(req.params.id), req.body);
    res.status(200).json({ success: true, data: equipo });
  };
}