export default class Vaccine {
  constructor(
    name: string,
    numberOfDoses: number,
    description: string,
    userId: number,
    image: string,
    mandatory: boolean
  ) {
    this.name = name;
    this.numberOfDoses = numberOfDoses;
    this.description = description;
    this.userId = userId;
    this.image = image;
    this.mandatory = mandatory
  }

  id!: number;
  name!: string;
  description!: string;
  numberOfDoses!: number;
  userId!: number;
  image!: string;
  mandatory!:boolean;
}
