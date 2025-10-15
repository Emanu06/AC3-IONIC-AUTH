import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { Data, Cuidador } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuidador-detail',
  templateUrl: './cuidador-detail.page.html',
  styleUrls: ['./cuidador-detail.page.scss'],
   standalone: true, // <-- ADICIONE ESTA LINHA
  imports: [IonicModule,CommonModule,FormsModule]
})
export class CuidadorDetailPage implements OnInit {
  cuidadorId: string | null = null;
  cuidador: Cuidador = {
    name: '',
    experience: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: Data,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Pega o ID da rota. Se existir, estamos no modo de edição.
    this.cuidadorId = this.route.snapshot.paramMap.get('id');
    if (this.cuidadorId) {
      this.loadCuidador();
    }
  }

  async loadCuidador() {
    const loading = await this.loadingCtrl.create({ message: 'Carregando...' });
    await loading.present();

    this.data.getCuidador(this.cuidadorId!).subscribe({
      next: (res: Cuidador | undefined) => {
        if (res) {
          this.cuidador = res;
        }
        loading.dismiss();
      },
      error: (err: any) => {
        console.error(err);
        loading.dismiss();
      }
    });
  }

  async saveCuidador() {
    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();

    if (this.cuidadorId) {
      // Se temos um ID, atualizamos o cuidador existente
      // Garantimos que o ID está no objeto antes de enviar
      this.data.updateCuidador({ ...this.cuidador, id: this.cuidadorId }).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      });
    } else {
      // Se não temos ID, adicionamos um novo cuidador
      this.data.addCuidador(this.cuidador).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      });
    }
  }

  async deleteCuidador() {
    if (!this.cuidadorId) return; // Não pode deletar se não existe

    const alert = await this.alertCtrl.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este cuidador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.data.deleteCuidador(this.cuidadorId!).then(() => {
              this.router.navigateByUrl('/home');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}