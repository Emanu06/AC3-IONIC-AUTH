import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { Data, Pet } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,FormsModule]
})
export class PageDetailPage implements OnInit {
  petId: string | null = null;
  pet: Pet = {
    name: '',
    especie: '',
    race: '',
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
    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.loadPet();
    }
  }

  async loadPet() {
    const loading = await this.loadingCtrl.create({ message: 'Carregando...' });
    await loading.present();

    this.data.getPet(this.petId!).subscribe({
      next: (res: Pet | undefined) => {
        if (res) {
          this.pet = res;
        }
        loading.dismiss();
      },
      error: (err: any) => {
        console.error(err);
        loading.dismiss();
      }
    });
  }

  async savePet() {
    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();

    if (this.petId) {
      // Se temos um ID, atualizamos o pet existente
      // Garantimos que o ID está no objeto antes de enviar
      this.data.updatePet({ ...this.pet, id: this.petId }).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      });
    } else {
      // Se não temos ID, adicionamos um novo pet
      this.data.addPet(this.pet).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      });
    }
  }

  async deletePet() {
    if (!this.petId) return; // Não pode deletar se não existe

    const alert = await this.alertCtrl.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este pet?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.data.deletePet(this.petId!).then(() => {
              this.router.navigateByUrl('/home');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}