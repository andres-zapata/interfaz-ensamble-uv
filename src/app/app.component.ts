import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interfaz-ensamble';
  unidadesDimensionales: number;
  dropout: number;
  epochs: number;
  selectedFuncionDeAct: any;
  funcionDeAct: any[];
  selectedMaquinas:any;
  maquinas:any[];
  selectedEnsamble:any;
  ensambles:any[];
  selectedPreproc:any;
  preprocesamiento:any[];

  constructor(private apiService:ApiService ){

    this.unidadesDimensionales = 128;
    this.dropout = 0.5;
    this.epochs = 200;

    this.selectedFuncionDeAct = {name : 'sigmoid'}
    this.funcionDeAct = [
      { name : 'sigmoid'},
      { name : 'softmax'}
    ]

    this.selectedMaquinas = []
    this.maquinas = [
      { name : 'LSTM'         , id : '1', type : 'NN'},
      { name : 'LSTM-2'       , id : '3', type : 'NN'},
      { name : 'RCNN'         , id : '3', type : 'NN'},
      { name : 'BIGRU'        , id : '4', type : 'NN'},
      { name : 'BIGRU-2'      , id : '5', type : 'NN'},
      { name : 'Naive Bayes'  , id : '6', type : 'Classic'},
      { name : 'SVM'          , id : '7', type : 'Classic'},
      { name : 'Random Forest', id : '9', type : 'Classic'},
    ]

    this.selectedEnsamble = undefined
    this.ensambles = [
      { name : 'Bagging'  , id : '1'},
      { name : 'Stacking' , id : '2'},
      { name : 'Promedio' , id : '3'}
    ]

    this.selectedPreproc = undefined
    this.preprocesamiento = [
      { grupo : 1},
      { grupo : 2}
    ]
  }

  ngOnInit(){
  }

  async getCargaTweets(){
    await this.apiService
    .getCargaTweets(this.selectedMaquinas)
    .subscribe(res => {
        let examsList = res;
      },
      console.error
    ); 
  }

  getGenerarDataset(){
    let res = this.apiService
    .getGenerarDataset(this.selectedPreproc)
    .subscribe(res => {
        let response = res;
      },
      console.error
    ); 
  }
}