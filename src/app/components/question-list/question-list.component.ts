import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, EMPTY  } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { QuestionService } from 'src/app/services/question.service';
import { Question} from 'src/app/interfases/question';
import { MatDialog } from '@angular/material/dialog';
import { QuestionFormComponent } from '../question-form/question-form.component'; 



@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  
})
export class QuestionListComponent implements OnInit{
  questions$: Observable<Question[]>;
  filterControl = new FormControl('');
  filteredQuestions$: Observable<Question[]> = of([]);
  
  

  displayedColumns: string[] = ['question', 'answer', 'actions'];

constructor(private questionService: QuestionService, private dialog: MatDialog ){
this.questions$ = this.questionService.questions$;


}
ngOnInit(): void {
  this.filteredQuestions$ = this.filterControl.valueChanges.pipe(
    startWith(''),
    filter(value => value !== null), 
    switchMap(value => {
      if (value !== null && value !== undefined) {
        return this.filterQuestions(value);
      } else {
        // Si el valor es null o undefined, simplemente devuelve un array vacío o algo adecuado según tu lógica
        return of([]);
      }
    })
  );
}

filterQuestions(value: string): Observable<Question[]> {
  const filterValue = value.toLowerCase();
  return this.questions$.pipe(
    map(questions => questions.filter(question => question.question.toLowerCase().includes(filterValue))),
    map(filteredQuestions => filteredQuestions || []) // Manejar el caso de null devolviendo un array vacío
  );
}

openFormDialog(question?: Question): void {
  const dialogRef = this.dialog.open(QuestionFormComponent, {
    width: '400px',
    data: question ? { ...question } : {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (result.id) {
        this.questionService.updateQuestion(result);
      } else {
        this.questionService.addQuestion({ ...result, id: this.getNewId() });
      }
    }
  });
}

getNewId(): number {
  let maxId = 0;
  this.questions$.subscribe(questions => {
    maxId = Math.max(...questions.map(q => q.id));
  });
  return maxId + 1;
}

deleteQuestion(id: number): void {
  this.questionService.deleteQuestion(id);
}
}
