import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CustomHttpClient {
  constructor(private http: HttpClient) {
  }

  getClients(): Observable<any> {
    return this.http.get("https://test-data.directorix.cloud/task1/")
  }
}
