import { Request, Response, NextFunction } from 'express';
import { ICreateAmbientesDTO, EstadoAmbiente } from '../dtos/Ambientes.dto';

const isCreateAmbientesDTO = (value: unknown): value is ICreateAmbientesDTO => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const ambiente = value as Record<string, unknown>;
  const allowedFields = new Set([
    'nombre',
    'bloque',
    'capacidadPcs',
    'estado'
  ]);

  // Validar que no se envíen campos extra
  const hasValidKeys = Object.keys(ambiente).every((key) => allowedFields.has(key));
  if (!hasValidKeys) return false;

  const validEstados: EstadoAmbiente[] = [
    'OPERATIVO',
    'MANTENIMIENTO',
    'INACTIVO'
  ];

  // Validaciones individuales basadas en las restricciones de la base de datos
  const isValidNombre = typeof ambiente.nombre === 'string' && ambiente.nombre.trim() !== '';
  const isValidBloque = typeof ambiente.bloque === 'string' && ambiente.bloque.trim() !== '';
  const isValidCapacidadPcs = 
    typeof ambiente.capacidadPcs === 'number' && 
    Number.isInteger(ambiente.capacidadPcs) && 
    ambiente.capacidadPcs >= 0;

  // 'estado' es opcional porque la BD tiene un DEFAULT 'OPERATIVO'
  const isValidEstado =
    ambiente.estado === undefined ||
    (typeof ambiente.estado === 'string' && validEstados.includes(ambiente.estado as EstadoAmbiente));

  return (
    isValidNombre &&
    isValidBloque &&
    isValidCapacidadPcs &&
    isValidEstado
  );
};

export const validateAmbientePayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;
  if (!isCreateAmbientesDTO(body)) {
    res.status(400).json({
      success: false,
      error: 'Datos del ambiente inválidos.'
    });
    return;
  }
  next();
};