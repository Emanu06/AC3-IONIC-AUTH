import { TestBed } from '@angular/core/testing';

// Corrigido: Importando 'AuthService' em vez de 'Auth'
import { AuthService } from './auth';

// Corrigido: A descrição do teste agora corresponde ao nome do serviço
describe('AuthService', () => {
  // Corrigido: A variável 'service' agora é do tipo 'AuthService'
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Corrigido: Injetando 'AuthService'
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});