import { Component, OnInit , ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, EMPTY  } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { QuestionService } from 'src/app/services/question.service';
import { Question} from 'src/app/interfases/question';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { QuestionFormComponent } from '../question-form/question-form.component'; 
import { PageEvent } from '@angular/material/paginator';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  
})
export class QuestionListComponent implements OnInit, AfterViewInit{
  questions$: Observable<Question[]>;
  totalQuestions: number = 0; // Agrega esta propiedad
  filterControl = new FormControl('');
  filteredQuestions$: Observable<Question[]> = of([]);
  filteredAndPaginatedQuestions$: Observable<Question[]> = of([]);
  displayedColumns: string[] = ['question', 'answer', 'actions'];
  pageSize = 5; // O el valor que desees como tamaño de página inicial
pageSizeOptions = [5, 10, 25, 100]; // O las opciones que desees ofrecer
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(
  private questionService: QuestionService,
  private dialog: MatDialog,
  private changeDetectorRef: ChangeDetectorRef
  ){
  this.questions$ = this.questionService.questions$;
}

/* ngOnInit(): void {
  this.questions$.subscribe(questions => {
   this.totalQuestions = questions.length;
    this.filteredQuestions$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      filter(value => value !== null),
      switchMap(value => this.filterQuestions(value as string)),
      map(filteredQuestions => {
        this.totalQuestions = filteredQuestions.length;
        return filteredQuestions;
      }),
      //switchMap(filteredQuestions => this.paginate(filteredQuestions))
    );
    this.updateDataSource();
 });
} */
ngOnInit(): void {
  this.questions$.subscribe(questions => {
    this.totalQuestions = questions.length;
    this.filteredQuestions$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      switchMap(filterValue => this.filterQuestions(filterValue as string))
    );

    this.filteredAndPaginatedQuestions$ = combineLatest([
      this.filteredQuestions$,
      this.paginator.page
    ]).pipe(
      map(([filteredQuestions, page]) => {
        const startIndex = page.pageIndex * page.pageSize;
        return filteredQuestions.slice(startIndex, startIndex + page.pageSize);
      })
    );

    this.updateDataSource();
  });
}
ngAfterViewInit(): void {
  
  // Asegúrate de que el paginador esté definido antes de asignarle valores
  if (this.paginator) {
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = 0;
    this.changeDetectorRef.detectChanges(); // Llama a detectChanges
    this.updateDataSource();
  }
  this.questions$.subscribe(questions => {
    this.totalQuestions = questions.length;
    // ... (resto de tu lógica de suscripción)
  });
}
// Método para manejar el evento de cambio de página
handlePage(event: PageEvent) {
  this.pageSize = event.pageSize;
  this.paginator.pageIndex = event.pageIndex;
  this.updateDataSource();
}
updateDataSource() {
  this.filteredQuestions$.subscribe(filteredQuestions => {
    const paginatedQuestions = this.paginate(filteredQuestions);
    paginatedQuestions.subscribe(data => {
      this.filteredAndPaginatedQuestions$ = of(data);
    });
  });
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
paginate(data: Question[]): Observable<Question[]> {
  const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  return of(data.slice(startIndex, startIndex + this.paginator.pageSize));
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
