import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../interfases/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

private questions: Question[] = [
  { id: 1, question: 'What is Angular?', answer: 'A framework for building web applications.' },
  { id: 2, question: 'What is TypeScript?', answer: 'A superset of JavaScript.' },
  { id: 3, question: 'What is RxJS?', answer: 'A library for reactive programming.' },
  { id: 4, question: 'What is NgModule?', answer: 'A decorator used to define Angular modules.' },
  { id: 5, question: 'What is Angular CLI?', answer: 'A command-line interface for Angular development.' },
  { id: 6, question: 'What is Angular Material?', answer: 'A UI component library for Angular applications.' },
  { id: 7, question: 'What is dependency injection in Angular?', answer: 'A design pattern for managing dependencies.' },
  { id: 8, question: 'What is a directive in Angular?', answer: 'A component that extends HTML with custom behavior.' },
  { id: 9, question: 'What is Angular router?', answer: 'A library for managing navigation in Angular applications.' },
  { id: 10, question: 'What is Angular HttpClientModule?', answer: 'A module for making HTTP requests in Angular applications.' },
  { id: 11, question: 'What is Angular forms?', answer: 'A mechanism for capturing and validating user input.' },
  { id: 12, question: 'What is Angular lifecycle hooks?', answer: 'Methods that Angular calls at certain points in the life of a component.' },
  { id: 13, question: 'What is Angular services?', answer: 'Singleton objects that are instantiated only once during the lifetime of an application.' },
  { id: 14, question: 'What is Angular pipes?', answer: 'Functions that transform input data to a desired output format.' },
  { id: 15, question: 'What is Angular testing?', answer: 'Writing and executing tests to ensure the quality of Angular applications.' },
  { id: 16, question: 'What is Angular animations?', answer: 'A way to bring motion to web applications.' },
  { id: 17, question: 'What is Angular decorators?', answer: 'Functions that modify classes, methods, or properties at design time.' },
  { id: 18, question: 'What is Angular zone?', answer: 'A wrapper around a context where change detection can occur.' },
  { id: 19, question: 'What is Angular change detection?', answer: 'A mechanism to detect and propagate changes.' },
  { id: 20, question: 'What is Angular NgZone?', answer: 'A service that provides a way to execute code outside the Angular zone.' }
];


private questionsSubject = new BehaviorSubject<Question[]>(this.questions);
questions$ = this.questionsSubject.asObservable();

addQuestion(question: Question) {
  this.questions.push(question);
  this.questionsSubject.next(this.questions);
}

updateQuestion(updatedQuestion: Question){
  const index = this.questions.findIndex(q => q.id === updatedQuestion.id);
  if (index > -1) {
    this.questions[index] = updatedQuestion;
    this.questionsSubject.next(this.questions);
  }
}
deleteQuestion(id: number) {
  const index = this.questions.findIndex(q => q.id === id); // Encuentra el índice de la pregunta con el ID dado
  if (index > -1) {
    this.questions.splice(index, 1); // Elimina la pregunta del arreglo utilizando splice
    this.questionsSubject.next(this.questions); // Notifica a los observadores sobre el cambio
  }
}

}
