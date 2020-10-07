import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(
    private firestore: AngularFirestore
  ) { }

/* create_NewFuncionario : Cria um novo registro na coleção especificada usando o método add */
create_NewFuncionario(record){
  return this.firestore.collection('Funcionarios').add(record);
}
/*read_Icecream: Chama o método snapshotChanges , que obterá registros e também será registrado para receber atualizações */
read_Funcionarios(){
  return this.firestore.collection('Funcionarios').snapshotChanges();
}
/*update_Icecream : atualiza o registro pegando o ID e chamando o método de atualização */
update_Funcionario(recordID,record) {
  this.firestore.doc('Funcionarios/' + recordID).update(record);
}
/*delete_Icecream : chama o método de exclusão  ao registrar o ID*/
delete_Funcionario(record_id) {
  this.firestore.doc('Funcionarios/' + record_id).delete();
  }
}
