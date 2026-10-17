import { Request, Response } from 'express';

export class equiposController {
  public static newequipos = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'el resgitro de ambientes todavía no está implementado.'
    });
  };

  public static getequipos = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: ' todavía no está implementada.'
    });
  };

  public static updatestatus = (req: Request, res: Response): void => {
    
    // TODO: pasar id a la operación de consulta y responder con el préstamo encontrado.
    res.status(501).json({
      success: false,
      message: `la actualizacion de estado todavía no está implementada.`
    });
  };

}
