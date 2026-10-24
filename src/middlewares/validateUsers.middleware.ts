import { Request, Response, NextFunction } from 'express';
import { ICreateUserDTO } from '../dtos/User.dto';

// 2. Función de guarda de tipo (Type Guard) para validar el payload
const isCreateUserDTO = (value: unknown): value is ICreateUserDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const user = value as Record<string, unknown>;
    return (
        typeof user.nombre === 'string' && user.nombre.trim() !== '' &&
        typeof user.apellido === 'string' && user.apellido.trim() !== '' &&
        typeof user.ficha === 'number' && Number.isInteger(user.ficha) &&
        typeof user.password === 'string' && user.password.trim() !== ''
    );
};

// 3. Middleware de Express para validar el request
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