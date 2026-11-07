import { InMemoryLoanRepository } from './repositories/in-memory-loan.repository';
import { LoanService } from './services/loan.service';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { UserService } from './services/user.service';
import { InMemoryEquipoRepository } from './repositories/in-memory-equipos.repository';
import { EquipoService } from './services/equipos.service';
import { InMemoryAmbienteRepository } from './repositories/in-memory-ambientes.repository';
import { AmbienteService } from './services/ambientes.service';

// Instancias y exportaciones para Loans (Préstamos)
const loanRepository = new InMemoryLoanRepository();
export const loanService = new LoanService(loanRepository);

// Instancias y exportaciones para Users (Usuarios)
const userRepository = new InMemoryUserRepository();
export const userService = new UserService(userRepository);

// Instancias y exportaciones para Equipos
const equipoRepository = new InMemoryEquipoRepository();
export const equipoService = new EquipoService(equipoRepository);

// Instancias y exportaciones para Ambientes
const ambienteRepository = new InMemoryAmbienteRepository();
export const ambienteService = new AmbienteService(ambienteRepository);