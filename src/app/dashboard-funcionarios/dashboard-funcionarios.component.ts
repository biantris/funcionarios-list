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
  funcionarioCalories: string;
  funcionarioDescription: number;

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(){
      this.funcionarioService.read_Funcionarios().subscribe(data => {
      this.funcionarios = data.map(e => {
      return{
        id: e.payload.doc.id,
        isEdit: false,
        Name: e.payload.doc.data()['Name'],
        Calories: e.payload.doc.data()['Calories'],
        Description: e.payload.doc.data()['Description'],
      };
      })
      console.log(this.funcionarios);
      });
      }
      CreateRecord(){
        let record = {};
        record['Name'] = this.funcionarioName;
        record['Calories'] = this.funcionarioCalories;
        record['Description'] = this.funcionarioDescription;
        this.funcionarioService.create_NewFuncionario(record).then(resp => {
          this.funcionarioName="";
          this.funcionarioCalories= "";
          this.funcionarioDescription = undefined;
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
        record.EditCalories = record.Calories;
        record.EditDescription = record.Description;
      }
      UpdateRecord(recordRow){
        let record = {};
        record['Name']=recordRow.EditName;
        record['Calories']= recordRow.EditCalories;
        record['Description']= recordRow.EditDescription;
        this.funcionarioService.update_Funcionario(recordRow.id, record);
        recordRow.isEdit = false;
      }
    }
