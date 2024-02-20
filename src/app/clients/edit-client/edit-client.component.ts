import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientModel} from "../../models/client.model";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  constructor(public dialogRef: MatDialogRef<EditClientComponent>, @Inject(MAT_DIALOG_DATA) public data: ClientModel) {

  }

  clientForm : FormGroup = new FormGroup({
    "name": new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    "surname": new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    "email": new FormControl<string>('', [Validators.required, Validators.email]),
    "phone": new FormControl<string>('', Validators.pattern("^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$")),
    "index": new FormControl()
  })

  ngOnInit(): void {
    if (this.data) {
      this.clientForm.setValue({
        "name": this.data.name,
        "surname": this.data.surname,
        "email": this.data.email,
        "phone": this.data.phone,
        "index": this.data.index
      })
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  getErrors(key:string): boolean {
    return !this.clientForm.get(key)!.errors;
  }
}
