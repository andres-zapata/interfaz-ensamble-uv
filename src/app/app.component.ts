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
  clickTrainModels: boolean;
  clickTrainEnsamble: boolean;

  constructor(private apiService:ApiService ){
    this.clickTrainModels = false;
    this.clickTrainEnsamble = false;

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
  imageToShowEnsambleAcc: any;
  imageToShowEnsambleLoss:any;
  imageToShowEnsambleMatrix:any;

  isImageLoading: boolean = false;
  
  ngOnInit(){
  }

  async postCargaTweets(){
    try {
      await this.apiService.postCargaTweets(this.selectedMaquinas).toPromise()
      await this.apiService.postGenerarDataset(this.selectedPreproc.grupo).toPromise();
      console.log('aaaa')
    } catch (error) {
      console.log(error)
    }
  }

  async postGenerarDataset(){
    await this.apiService.postGenerarDataset(this.selectedPreproc.grupo).toPromise();
  }

  postTrainModels(){
    let data = {
      preProc : this.selectedPreproc.grupo,
      maquinas : this.selectedMaquinas,
      unidadesDimensionales : this.unidadesDimensionales,
      dropout : this.dropout,
      epochs : this.epochs,
      funcionActivacion : this.selectedFuncionDeAct.name
    }
    this.isImageLoading = true;
    this.clickTrainModels = true;
    
    
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

  postTrainEnsamble(){
    this.clickTrainEnsamble = true;
    let data = {
      maquinas : this.selectedMaquinas,
    }

    if (this.selectedEnsamble.id == 1) {
      this.apiService.postTrainEnsambleBagging(data)
      .subscribe(res => {

        let url = res.accRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleAcc = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
        url = res.lossRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleLoss = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
        url = res.matrixRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleMatrix = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
      })
    }

    if (this.selectedEnsamble.id == 2) {
      this.apiService.postTrainEnsambleStacking(data)
      .subscribe(res => {

        let url = res.accRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleAcc = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
        url = res.lossRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleLoss = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
        url = res.matrixRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleMatrix = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
      })
    }


    if (this.selectedEnsamble.id == 3) {
      this.apiService.postTrainEnsamblePromedio(data)
      .subscribe(res => {

        let url = res.matrixRoute
        this.apiService.postImage({url : url}).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {this.imageToShowEnsambleMatrix = reader.result;}, false);
          reader.readAsDataURL(data);      
        });
  
      })
    }

    
    
  }

}
