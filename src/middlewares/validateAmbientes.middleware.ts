import { Request, Response, NextFunction } from 'express';
import { ICreateAmbientesDTO } from '../dtos/Ambientes.dto';

const isCreateAmbientesDTO = (value: unknown): value is ICreateAmbientesDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const ambientes = value as Record<string, unknown>;
    return (
        typeof ambientes.piso === 'number' && Number.isInteger(ambientes.piso) &&
        typeof ambientes.numeroAmbiente === 'number' && Number.isInteger(ambientes.numeroAmbiente) &&
        typeof ambientes.instructorACargo === 'string' && ambientes.instructorACargo.trim() !== ''
    );
};

export const validateAmbientesPayload = (
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