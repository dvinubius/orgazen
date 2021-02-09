import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Board, Task } from './board.model';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates new board for the current user
   */
  async createBoard(data: Board) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    });
  }

  /**
   * Deletes board with given id
   */
  async deleteBoard(boardId: string) {
    this.db.collection('boards').doc(boardId).delete();
  }

  async updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  async removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({ tasks: firebase.firestore.FieldValue.arrayRemove(task) });
  }

  /**
   * Get a stream of all boards owned by current User
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Reordering of boards for current user
   * @param boards: the new ordering
   */
  sortBoards(boards: Board[]) {
    const batch = this.db.firestore.batch();
    const refs = boards.map(
      (board) => this.db.collection('boards').doc(board.id).ref
    );
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
