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
       'LSTM',
       'LSTM-2',
       'RCNN',
       'BIGRU',
       'BIGRU-2',
       'Naive Bayes',
       'SVM',
       'Random Forest'
    ]

    this.selectedEnsamble = { name : 'Bagging'  , id : '1'}

    this.ensambles = [
      { name : 'Bagging'  , id : '1'},
      { name : 'Stacking' , id : '2'},
      { name : 'Promedio' , id : '3'}
    ]

    this.selectedPreproc = { grupo : 1}
    this.preprocesamiento = [
      { grupo : 1},
      { grupo : 2}
    ]
  }

  imageToShowAcc: any;
  imageToShowLoss:any;
  isImageLoading: boolean = false;
  
  ngOnInit(){
  }

  async postCargaTweets(){
    await this.apiService
    .postCargaTweets(this.selectedMaquinas)
    .subscribe(res => {
        let examsList = res;
      },
      console.error
    ); 
  }

  postGenerarDataset(){
    let res = this.apiService
    .postGenerarDataset(this.selectedPreproc.grupo)
    .subscribe(res => {
        let response = res;
      },
      console.error
    ); 
  }

  postTrainModels(){
    let data = {
      preProc : this.selectedPreproc.grupo,
      maquinas : this.selectedMaquinas,
      unidadesDimensionales : this.unidadesDimensionales,
      dropout : this.dropout,
      epochs : this.epochs
    }
    this.isImageLoading = true;
    
    
    let res = this.apiService
    .postTrainModels(data)
    .subscribe(res => {

        //let url = res.accRoute

        let url = "pre2_acc.png"
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowAcc = reader.result;}, false);
          reader.readAsDataURL(data);      
        });


        //url = res.lossRoute
        url = "pre2_loss.png"
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowLoss = reader.result;}, false);
          reader.readAsDataURL(data);      
          this.isImageLoading = false;
        });
    });
    

    
  }

}
