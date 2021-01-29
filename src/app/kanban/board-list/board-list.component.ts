import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[];
  sub: Subscription;

  constructor(private boardSvc: BoardService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.sub = this.boardSvc.getUserBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardSvc.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.matDialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardSvc.createBoard({
          title: result,
          priority: this.boards.length,
        });
      }
    });
  }
}
