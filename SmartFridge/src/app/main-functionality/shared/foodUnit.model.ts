export class FoodUnit {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public nrOfExpirationDays: number,
    public nrOfExpirationMonths: number,
    public nrOfExpirationYears: number
  ) {}
}
