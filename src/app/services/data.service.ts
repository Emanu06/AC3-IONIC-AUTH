import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pet { id?: string; name: string; especie: string; race: string; }
export interface Cuidador { id?: string; name: string; experience: string; }

@Injectable({ providedIn: 'root' })
export class Data {
  constructor(private firestore: AngularFirestore) {}

  getPets(): Observable<Pet[]> {
    const petsCollection = this.firestore.collection<Pet>('pets');
    return petsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data(); const id = a.payload.doc.id; return { id, ...data };
    })));
  }
  getPet(id: string): Observable<Pet | undefined> {
    const petDoc = this.firestore.doc<Pet>(`pets/${id}`);
    return petDoc.valueChanges();
  }
  addPet(pet: Pet) {
    const petsCollection = this.firestore.collection<Pet>('pets');
    return petsCollection.add(pet);
  }
  updatePet(pet: Pet) {
    const petDoc = this.firestore.doc<Pet>(`pets/${pet.id}`);
    return petDoc.update(pet);
  }
  deletePet(id: string) {
    const petDoc = this.firestore.doc<Pet>(`pets/${id}`);
    return petDoc.delete();
  }
  getCuidadores(): Observable<Cuidador[]> {
    const cuidadoresCollection = this.firestore.collection<Cuidador>('cuidadores');
    return cuidadoresCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data(); const id = a.payload.doc.id; return { id, ...data };
    })));
  }
  getCuidador(id: string): Observable<Cuidador | undefined> {
    const cuidadorDoc = this.firestore.doc<Cuidador>(`cuidadores/${id}`);
    return cuidadorDoc.valueChanges();
  }
  addCuidador(cuidador: Cuidador) {
    const cuidadoresCollection = this.firestore.collection<Cuidador>('cuidadores');
    return cuidadoresCollection.add(cuidador);
  }
  updateCuidador(cuidador: Cuidador) {
    const cuidadorDoc = this.firestore.doc<Cuidador>(`cuidadores/${cuidador.id}`);
    return cuidadorDoc.update(cuidador);
  }
  deleteCuidador(id: string) {
    const cuidadorDoc = this.firestore.doc<Cuidador>(`cuidadores/${id}`);
    return cuidadorDoc.delete();
  }
}