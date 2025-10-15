import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  /**
   * Registra um novo usuário com e-mail e senha.
   */
  registerUser(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }

  /**
   * Realiza o login de um usuário com e-mail e senha.
   */
  loginUser(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  /**
   * Inicia o fluxo de login com uma conta do Google.
   */
  loginWithGoogle() {
    return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  /**
   * Realiza o logout do usuário atualmente logado.
   */
  logout() {
    return this.afAuth.signOut();
  }

  /**
   * Retorna um Observable que emite o estado da autenticação do usuário.
   * (Sem tipo de retorno explícito para evitar conflitos de tipo).
   */
  getAuthState() {
    return this.afAuth.authState;
  }
}