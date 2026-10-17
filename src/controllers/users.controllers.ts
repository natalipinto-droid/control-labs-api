import { Request, Response } from 'express';

export class usersController {
  public static getusers = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'L consulta de usuarios todavía no está implementado.'
    });
  };

  public static newusers = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: 'El registro todavía no está implementada.'
    });
  };

  public static getdetails = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de consulta y responder con el préstamo encontrado.
    res.status(501).json({
      success: false,
      message: `los detalles del usuario: ${id} todavía no está implementada.`
    });
  };

  public static updaterol = (req: Request, res: Response): void => {
    const { rol } = req.params;
    // TODO: pasar id a la operación de aceptación y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `La actualizacion del rol todavía no está implementada.`
    });
  };

  public static deletepusers = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de consulta y responder con el préstamo encontrado.
    res.status(501).json({
      success: false,
      message: `la eliminacion del usuario: ${id} todavía no está implementada.`
    });
  };
}