import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './../funcionario';


@Component({
  selector: 'app-dashboard-funcionarios',
  templateUrl: './dashboard-funcionarios.component.html',
  styleUrls: ['./dashboard-funcionarios.component.css']
})
export class DashboardFuncionariosComponent implements OnInit {



  funcionarios: any;
  funcionarioName: string;
  funcionarioCargo: string;
  funcionarioTelefone: number;




  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(){
      this.funcionarioService.read_Funcionarios().subscribe(data => {
      this.funcionarios = data.map(e => {
      return{
        id: e.payload.doc.id,
        isEdit: false,
        Name: e.payload.doc.data()['Name'],
        Cargo: e.payload.doc.data()['Cargo'],
        Telefone: e.payload.doc.data()['Telefone'],


      };
      })
      console.log(this.funcionarios);
      });
      }
      CreateRecord(){
        let record = {};
        record['Name'] = this.funcionarioName;
        record['Cargo'] = this.funcionarioCargo;
        record['Telefone'] = this.funcionarioTelefone;

        this.funcionarioService.create_NewFuncionario(record).then(resp => {
          this.funcionarioName="";
          this.funcionarioCargo= "";
          this.funcionarioTelefone = undefined;


          console.log(resp);
        })
        .catch(error => {
          console.log(error);
        });
      }
      RemoveRecord(rowID) {
          this.funcionarioService.delete_Funcionario(rowID);
      }
      EditRecord(record){
        record.isEdit = true;
        record.EditName = record.Name;
        record.EditCargo = record.EditCargo;
        record.EditTelefone = record.Telefone;


      }
      UpdateRecord(recordRow){
        let record = {};
        record['Name']=recordRow.EditName;
        record['Cargo']= recordRow.EditCargo;
        record['Telefone']= recordRow.EditTelefone;

        this.funcionarioService.update_Funcionario(recordRow.id, record);
        recordRow.isEdit = false;
      }

      OnSearchClear() {
        this.funcionarioName = "";
        this.applyFilter();
      }

      applyFilter() {
        this.funcionarios.filter = this.funcionarioName.trim().toLowerCase();
      }


    }

