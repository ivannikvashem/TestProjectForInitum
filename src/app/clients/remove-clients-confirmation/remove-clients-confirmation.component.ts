import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-remove-clients-confirmation',
  templateUrl: './remove-clients-confirmation.component.html',
  styleUrls: ['./remove-clients-confirmation.component.scss']
})
export class RemoveClientsConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<RemoveClientsConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
