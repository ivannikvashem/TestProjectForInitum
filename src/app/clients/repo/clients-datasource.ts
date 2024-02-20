import {ClientModel} from "../../models/client.model";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, map, Observable} from "rxjs";
import {CustomHttpClient} from "../../service/httpClient";

export class ClientsDatasource implements DataSource<ClientModel> {
  constructor(private httpClient:CustomHttpClient) {
  }

  private clientsListSubject = new BehaviorSubject<ClientModel[]>([]);

  connect(collectionViewer: CollectionViewer): Observable<ClientModel[]> {
    return this.clientsListSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.clientsListSubject.complete();
  }

  getClients(): Observable<ClientModel[]> {
    return this.httpClient.getClients().pipe(
      map((res: any) => {
        return res.users.map((user: any, index: number) => {
          return { ...user, index: index };
        });
      }),
    );
  }
}
