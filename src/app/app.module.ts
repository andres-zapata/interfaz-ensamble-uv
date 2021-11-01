import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule  } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule   } from '@angular/forms';
import { InputNumberModule} from 'primeng/inputnumber';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    ListboxModule,
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
