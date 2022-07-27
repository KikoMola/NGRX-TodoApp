import { FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  checkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.checkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( toggle({ id: this.todo.id }));
    })
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
    this.txtInputFisico.nativeElement.focus();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.texto) { return; }
    
    this.store.dispatch( editar({ id: this.todo.id, texto: this.txtInput.value }));
  }
}
