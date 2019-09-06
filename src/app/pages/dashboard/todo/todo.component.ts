import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [ TodoService ]
})
export class TodoComponent {
  public todoList: Array<any>;
  public newTodoText: string = '';
  public suivis: any[];

  constructor( private _todoService: TodoService) {
    this.todoList = this._todoService.getTodoList();
//    this._todoService.getSuivisOfDay().subscribe((data) => {
//      this.suivis = data;
//    });
  }

  public  getNotDeleted() {
    return this.todoList.filter((item: any) => {
      return !item.deleted;
    });
  }

  public addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      this.todoList.unshift({
          text: this.newTodoText
      });
      this.newTodoText = '';
    }
  }

}
