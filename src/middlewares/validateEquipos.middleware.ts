import { Request, Response, NextFunction } from 'express';
import { ICreateEquiposDTO } from '../dtos/equipos.dto';

const isCreateEquiposDTO = (value: unknown): value is ICreateEquiposDTO => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const equipos = value as Record<string, unknown>;
    return (
        typeof equipos.numeroPC === 'number' && Number.isInteger(equipos.numeroPC) &&
        typeof equipos.marca === 'string' && equipos.marca.trim() !== '' &&
        typeof equipos.serial === 'string' && equipos.serial.trim() !== '' &&
        typeof equipos.estado === 'string' && equipos.estado.trim() !== ''
    );
};

export const validateEquiposPayload = (
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