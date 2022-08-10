
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /*pendings = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  inProgress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  done = ['Get up', 'Brush teeth', 'Take a shower', ];*/

  /*data:any = {
    pendings:['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
    inProgress:['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'],
    done:['Get up', 'Brush teeth', 'Take a shower', ]
  }*/
  data:any ={};

  constructor( private todoService:TodoService,
    private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
   // this.setItem();
   this.getAllTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
    }
    this.updateTodo();
    /*Object.keys(this.data).forEach( (key)=>{
      localStorage.setItem(key,JSON.stringify(this.data[key]));
      });*/
  }

  addTodo(todo){
    const obj ={todo: todo.value}
    this.todoService.addTodo(obj)
    .subscribe((res:any)=>{
      console.log(res);
      this.openSnackBar(res.message);
      this.getAllTodos();
      todo.value='';
    }
    ,(err)=>{
      console.log(err);
    })
  }

  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe((res)=>{
      Object.keys(res).forEach((key)=>{
        this.data[key] = res[key];
        
        console.log(res);
      })
      
    }
    ,(err)=>{
      console.log(err);
    })
  }

  updateTodo(){
    this.todoService.updateTodo(this.data)
    .subscribe((res)=>{
      console.log(res)
      this.getAllTodos();
      }
    ,(err)=>{
      console.log(err);
    })
  }
  removeTodo(id){
    if (confirm('bu maddeyi silmek istediğinize emin misiniz')) {
      this.todoService.removeTodo(id)
    .subscribe((res)=>{
      console.log(res);
      this.getAllTodos();
      }
    ,(err)=>{
      console.log(err);
    });
    }
    
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  /*addTodo(todo:any)
  {
    this.data.pendings.push(todo.value);
    todo.value ='';
    localStorage.setItem('pendings',JSON.stringify(this.data.pendings));
  }*/
  /*setItem(){

    Object.keys(this.data).forEach( (key)=>{
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key,JSON.stringify(this.data[key]));
      } else {
        this.data[key]=JSON.parse(localStorage.getItem(key)|| '{}');
      }
    });

    /*localStorage.setItem('pendings',JSON.stringify(this.pendings))
    localStorage.setItem('inProgress',JSON.stringify(this.inProgress))
    localStorage.setItem('done',JSON.stringify(this.done))

  }*/
}
