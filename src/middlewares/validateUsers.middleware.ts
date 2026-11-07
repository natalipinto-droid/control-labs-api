import { Request, Response, NextFunction } from 'express';
import { ICreateUserDTO } from '../dtos/User.dto';

const isCreateUserDTO = (value: unknown): value is ICreateUserDTO => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const user = value as Record<string, unknown>;
  const allowedFields = new Set([
    'email',
    'nombre',
    'rol',
    'activo'
  ]);

  // Validar que las llaves coincidan estrictamente con las permitidas
  const hasValidKeys = Object.keys(user).every((key) => allowedFields.has(key));
  if (!hasValidKeys) return false;

  // Validar tipos y restricciones de la base de datos (sin password)
  const isValidEmail = typeof user.email === 'string' && user.email.trim() !== '';
  const isValidNombre = typeof user.nombre === 'string' && user.nombre.trim() !== '';
  const isValidRol = typeof user.rol === 'string' && ['ADMIN', 'GUARDA', 'INSTRUCTOR'].includes(user.rol);
  
  // 'activo' es opcional ya que la base de datos tiene un DEFAULT TRUE
  const isValidActivo = user.activo === undefined || typeof user.activo === 'boolean';

  return (
    isValidEmail &&
    isValidNombre &&
    isValidRol &&
    isValidActivo
  );
};

export const validateUserPayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;
  if (!isCreateUserDTO(body)) {
    res.status(400).json({
      success: false,
      error: 'Datos del usuario inválidos.'
    });
    return;
  }
  next();
};