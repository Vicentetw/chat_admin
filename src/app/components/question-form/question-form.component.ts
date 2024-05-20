import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/interfases/question';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<QuestionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question
  ) {
    this.questionForm = this.fb.group({
      id: [data?.id],
      question: [data?.question || '', Validators.required],
      answer: [data?.answer || '', Validators.required]
    });
  }

  save() {
    if (this.questionForm.valid) {
      this.dialogRef.close(this.questionForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
