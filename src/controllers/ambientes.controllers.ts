import { Request, Response } from 'express';

export class ambientesController {
  public static getambientes = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'la lista de ambientes todavía no está implementado.'
    });
  };

  public static newambientes = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: 'El registro todavía no está implementada.'
    });
  };

  public static updateambientes = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de consulta y responder con el préstamo encontrado.
    res.status(501).json({
      success: false,
      message: `los detalles del usuario: ${id} todavía no está implementada.`
    });
  };

}
