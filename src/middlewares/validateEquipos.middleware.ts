import { Request, Response, NextFunction } from 'express';
import { ICreateEquiposDTO, TipoEquipo, EstadoEquipo } from '../dtos/equipos.dto';

const isUuid = (value: unknown): value is string =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const isCreateEquiposDTO = (value: unknown): value is ICreateEquiposDTO => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const equipo = value as Record<string, unknown>;
  const allowedFields = new Set([
    'placaSena',
    'codigoActivo',
    'tipo',
    'roomId',
    'estado'
  ]);

  // Validar que no se envíen campos extra
  const hasValidKeys = Object.keys(equipo).every((key) => allowedFields.has(key));
  if (!hasValidKeys) return false;

  const validTipos: TipoEquipo[] = [
    'COMPUTADOR',
    'MOUSE',
    'TECLADO',
    'CARGADOR',
    'TELEVISOR',
    'CONTROL_TV'
  ];

  const validEstados: EstadoEquipo[] = [
    'OPERATIVO',
    'MANTENIMIENTO',
    'FUERA_DE_SERVICIO'
  ];

  // Validaciones individuales de cada campo según la base de datos
  const isValidPlacaSena = typeof equipo.placaSena === 'string' && equipo.placaSena.trim() !== '';
  const isValidCodigoActivo = typeof equipo.codigoActivo === 'string' && equipo.codigoActivo.trim() !== '';
  const isValidTipo = typeof equipo.tipo === 'string' && validTipos.includes(equipo.tipo as TipoEquipo);
  const isValidRoomId = isUuid(equipo.roomId);
  
  // 'estado' es opcional porque la BD tiene un DEFAULT 'OPERATIVO'
  const isValidEstado =
    equipo.estado === undefined ||
    (typeof equipo.estado === 'string' && validEstados.includes(equipo.estado as EstadoEquipo));

  return (
    isValidPlacaSena &&
    isValidCodigoActivo &&
    isValidTipo &&
    isValidRoomId &&
    isValidEstado
  );
};

export const validateEquipoPayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;
  if (!isCreateEquiposDTO(body)) {
    res.status(400).json({
      success: false,
      error: 'Datos del equipo inválidos.'
    });
    return;
  }
  next();
};