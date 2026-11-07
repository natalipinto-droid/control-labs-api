import { InMemoryLoanRepository } from './repositories/in-memory-loan.repository';
import { LoanService } from './services/loan.service';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { UserService } from './services/user.service';

// Instancias y exportaciones para Loans (Préstamos)
const loanRepository = new InMemoryLoanRepository();
export const loanService = new LoanService(loanRepository);

// Instancias y exportaciones para Users (Usuarios)
const userRepository = new InMemoryUserRepository();
export const userService = new UserService(userRepository);