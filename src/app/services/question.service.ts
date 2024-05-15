import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../interfases/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

private questions: Question[] = [
  { id: 1, question: 'What is Angular?', answer: 'A framework for building web applications.' },
  { id: 2, question: 'What is TypeScript?', answer: 'A superset of JavaScript.' }
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
