import {NgModule} from "@angular/core";
import {ClientsComponent} from "./clients.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {NgClass, NgIf} from "@angular/common";
import { EditClientComponent } from './edit-client/edit-client.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { RemoveClientsConfirmationComponent } from './remove-clients-confirmation/remove-clients-confirmation.component';

@NgModule({
  declarations: [
    ClientsComponent,
    EditClientComponent,
    RemoveClientsConfirmationComponent
  ],
  imports: [
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    NgClass,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [],
  exports: [
    ClientsComponent
  ]
})
export class ClientsModule { }
