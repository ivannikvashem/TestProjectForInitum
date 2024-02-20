export class ClientModel {
  index:number;
  name:string;
  surname:string;
  email:string;
  phone:string;

  constructor() {
    this.index = 0;
    this.name = '';
    this.surname = '';
    this.email = '';
    this.phone = '';
  }
}
