export class User {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    private _token: string    
  ) {}

  get token() {
    return this._token;
  }
  
}
