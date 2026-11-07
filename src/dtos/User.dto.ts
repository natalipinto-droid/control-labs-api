export type RolType = 'ADMIN' | 'GUARDA' | 'INSTRUCTOR';

export interface ICreateUserDTO {
  email: string;
  nombre: string;
  rol: RolType;
  activo?: boolean; // Es opcional (?) ya que en la BD tiene un DEFAULT TRUE
 // Lo mantengo por si tu registro requiere contraseña
}