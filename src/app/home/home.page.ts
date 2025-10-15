import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

// Importe seus serviços
import { Data, Pet, Cuidador } from '../services/data.service';
import { AuthService } from '../services/auth';

// Importação CORRETA para a API de Compatibilidade
import firebase from 'firebase/compat/app';

// Importações necessárias para componente standalone
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  pets: Pet[] = [];
  cuidadores: Cuidador[] = [];

  // Variável tipada CORRETAMENTE com firebase.User
  user$: Observable<firebase.User | null>;

  // Variáveis para os campos do formulário
  email = '';
  password = '';

  constructor(
    private data: Data,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.user$ = this.authService.getAuthState();
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.data.getPets().subscribe(res => {
          this.pets = res;
        });
        this.data.getCuidadores().subscribe(res => {
          this.cuidadores = res;
        });
      } else {
        // Limpa os dados se o usuário fizer logout
        this.pets = [];
        this.cuidadores = [];
      }
    });
  }

  // --- MÉTODOS DE AUTENTICAÇÃO ---

  async register() {
    try {
      const userCredential = await this.authService.registerUser(this.email, this.password);
      console.log('Registrado com sucesso!', userCredential);
      this.email = '';
      this.password = '';
    } catch (error: any) {
      this.showAlert('Erro no Registro', error.message || 'Não foi possível registrar. Verifique os dados e tente novamente.');
      console.error(error);
    }
  }

  async login() {
    try {
      const userCredential = await this.authService.loginUser(this.email, this.password);
      console.log('Login realizado com sucesso!', userCredential);
       this.email = '';
       this.password = '';
    } catch (error: any) {
      this.showAlert('Erro no Login', error.message || 'E-mail ou senha inválidos.');
      console.error(error);
    }
  }

  async loginGoogle() {
    try {
      const userCredential = await this.authService.loginWithGoogle();
      console.log('Login com Google realizado com sucesso!', userCredential);
    } catch (error: any) {
      this.showAlert('Erro no Login com Google', error.message || 'Não foi possível fazer o login com o Google.');
      console.error(error);
    }
  }

  logout() {
    this.authService.logout();
  }


  // --- MÉTODOS PARA PETS E CUIDADORES ---

  addPet() {
    this.router.navigateByUrl('/page-detail');
  }
  addCuidador() {
    this.router.navigateByUrl('/cuidador-detail');
  }

  editPet(pet: Pet) {
    this.router.navigateByUrl(`/page-detail/${pet.id}`);
  }

  editCuidador(cuidador: Cuidador) {
    this.router.navigateByUrl(`/cuidador-detail/${cuidador.id}`);
  }

  async deletePet(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este pet?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Excluir', handler: () => { this.data.deletePet(id); } }
      ],
    });
    await alert.present();
  }

  async deleteCuidador(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este cuidador?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Excluir', handler: () => { this.data.deleteCuidador(id); } }
      ],
    });
    await alert.present();
  }

  // --- FUNÇÃO AUXILIAR ---
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}