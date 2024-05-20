import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Agrega BrowserAnimationsModule
import { MatTableModule } from '@angular/material/table'; // Agrega MatTableModule
import { MatInputModule } from '@angular/material/input'; // Agrega MatInputModule
import { MatIconModule } from '@angular/material/icon'; // Agrega MatIconModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Agrega MatFormFieldModule
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuestionService } from './services/question.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule
    MatTableModule, // Agrega MatTableModule
    MatInputModule, // Agrega MatInputModule
    MatIconModule, // Agrega MatIconModule
    MatSliderModule,
    MatFormFieldModule, // Agrega MatFormFieldModule
    MatButtonModule,
    MatDialogModule,
    MatPaginator,
    MatPaginatorModule
  ],
  providers: [
    QuestionService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
