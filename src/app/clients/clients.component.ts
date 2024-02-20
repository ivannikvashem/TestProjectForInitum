import {Component, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {ClientsDatasource} from "./repo/clients-datasource";
import {CustomHttpClient} from "../service/httpClient";
import {ClientModel} from "../models/client.model";
import {LocalStorageService} from "../service/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {EditClientComponent} from "./edit-client/edit-client.component";
import {RemoveClientsConfirmationComponent} from "./remove-clients-confirmation/remove-clients-confirmation.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  displayedColumns: string[] = ['checkbox', 'name', 'surname', 'email', 'phone'];
  dataSourceService: ClientsDatasource;
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<ClientModel>(true, []);
  pageData = this._localStorageService.myData$;
  @ViewChild('ClientsTable') private table!: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(httpClient:CustomHttpClient, private _localStorageService: LocalStorageService, public dialog: MatDialog) {
    this.dataSourceService = new ClientsDatasource(httpClient);
  }

  ngOnInit(): void {
    if (this.getLocalStorageData().length <= 0) {
     this.dataSourceService.getClients().subscribe(clientsData => {
       this.dataSource.data = clientsData;
       this._localStorageService.setData("Clients", clientsData)
     });
    } else {
      this.dataSource.data = this.getLocalStorageData();
    }
  }

  getLocalStorageData(): ClientModel[] {
    this._localStorageService.getData("Clients")
    let result:ClientModel[] = [];
    this.pageData.subscribe(localStorageContent => {
      if (localStorageContent) {
        result = localStorageContent;
      }
    })
    return result;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  editClient(client:ClientModel) {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '500px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let foundClient = this.dataSource.data.find(x => x.index == result.index)
        foundClient.name = result.name;
        foundClient.surname = result.surname;
        foundClient.email = result.email;
        foundClient.phone = result.phone;
        this._localStorageService.setData("Clients", this.dataSource.data);
        this.table.renderRows()
      }
    })
  }

  addNewClient() {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.index == undefined) {
        result.index = this.dataSource.data.length;
        this.dataSource.data.push(result)
        this._localStorageService.setData("Clients", this.dataSource.data);
        this.table.renderRows()
      }
    })
  }

  deleteSelectedClients() {
    const dialogRef = this.dialog.open(RemoveClientsConfirmationComponent, {
      width: '500px',
      height: '300px',
      data: this.selection.selected.length
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        for (let i of this.selection.selected) {
          this.dataSource.data = this.dataSource.data.filter(x => x.index != i.index);
          this._localStorageService.removeDataField("Clients", i.index);
        }
        this.selection.clear();
        this.table.renderRows();
      }
    })
  }
}
