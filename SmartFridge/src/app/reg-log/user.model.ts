export class User {

   // email: string;
   // id: string;
   // theToken: string;
   // tokenExpirationData: Date;

 constructor(
    public email: string,
    public id: string,
    private theToken: string,
    private tokenExpirationData: Date
 ) {}

  get token() {
    if (!this.tokenExpirationData || new Date() > this.tokenExpirationData) {
      return null;
    }
    return this.theToken;
  }
}
