export type EstadoAmbiente = 'OPERATIVO' | 'MANTENIMIENTO' | 'INACTIVO';

export interface ICreateAmbientesDTO {
  nombre: string;
  bloque: string;
  capacidadPcs: number;
  estado?: EstadoAmbiente; // Es opcional porque en la BD tiene un DEFAULT 'OPERATIVO'
}