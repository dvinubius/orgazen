import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent {
  constructor(public dialogRef: MatDialogRef<DisclaimerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
