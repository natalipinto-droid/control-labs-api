import { Request, Response } from 'express';
import { ambienteService } from '../container';
import { DomainError } from '../errors/domain.errors';
import { ICreateAmbientesDTO, EstadoAmbiente } from '../dtos/Ambientes.dto';

export class AmbienteController {
  public static createAmbiente = async (
    req: Request<Record<string, string>, unknown, ICreateAmbientesDTO>,
    res: Response
  ): Promise<void> => {
    const ambiente = await ambienteService.createAmbiente(req.body);
    res.status(201).json({ success: true, data: ambiente });
  };

  public static getAmbientesByFilter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { bloque, estado } = req.query;

    if (bloque !== undefined && typeof bloque !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro bloque debe ser un texto.'
      );
    }

    if (estado !== undefined && typeof estado !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado debe ser un texto.'
      );
    }

    const validEstados: EstadoAmbiente[] = ['OPERATIVO', 'MANTENIMIENTO', 'INACTIVO'];
    if (estado !== undefined && !validEstados.includes(estado as EstadoAmbiente)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado no es válido.'
      );
    }

    const ambientes = await ambienteService.getAmbientes({
      bloque,
      estado: estado as EstadoAmbiente | undefined
    });

    res.status(200).json({ success: true, data: ambientes });
  };

  public static getAmbienteById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const ambiente = await ambienteService.getAmbienteDetail(Number(req.params.id));
    res.status(200).json({ success: true, data: ambiente });
  };

  public static updateAmbiente = async (
    req: Request<{ id: string }, unknown, Partial<ICreateAmbientesDTO>>,
    res: Response
  ): Promise<void> => {
    const ambiente = await ambienteService.updateAmbiente(Number(req.params.id), req.body);
    res.status(200).json({ success: true, data: ambiente });
  };
}