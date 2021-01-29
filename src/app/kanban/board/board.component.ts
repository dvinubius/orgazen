import { Component, Input, OnInit } from '@angular/core';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  constructor(private boardSvc: BoardService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardSvc.updateTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number) {
    const newTask = { label: 'purple' };
    const dialogRef = this.matDialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.boardSvc.updateTasks(this.board.id, [
            ...this.board.tasks,
            result.task,
          ]);
        } else {
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardSvc.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.boardSvc.deleteBoard(this.board.id);
  }
}
