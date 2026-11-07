export type TipoEquipo = 'COMPUTADOR' | 'MOUSE' | 'TECLADO' | 'CARGADOR' | 'TELEVISOR' | 'CONTROL_TV';
export type EstadoEquipo = 'OPERATIVO' | 'MANTENIMIENTO' | 'FUERA_DE_SERVICIO';

export interface ICreateEquiposDTO {
  placaSena: string;
  codigoActivo: string;
  tipo: TipoEquipo;
  roomId: string;
  estado?: EstadoEquipo; // Es opcional porque en la BD tiene un DEFAULT 'OPERATIVO'
}