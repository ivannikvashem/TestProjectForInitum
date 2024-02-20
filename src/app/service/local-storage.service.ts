import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {LocalStorageRefService} from "./local-storage-ref.service";
import {ClientModel} from "../models/client.model";

@Injectable({
  providedIn: 'root'
})

export class  LocalStorageService {
  private _localStorage: Storage;

  private _myData$ = new BehaviorSubject<any>(null)
  public myData$ = this._myData$.asObservable()

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage
  }

  getData(key:string) {
    const data = JSON.parse(this._localStorage.getItem(key)!)
    this._myData$.next(data);
  }

  setData(key:string, data:any) {
    const jsonData = JSON.stringify(data)
    this._localStorage.setItem(key, jsonData)
    this._myData$.next(data)
  }

  removeDataField(key:string, index:number) {
    let clients = JSON.parse(this._localStorage.getItem(key)!) as ClientModel[];
    clients = clients.filter(x => x.index != index);
    this.setData("Clients", clients)
  }
}
