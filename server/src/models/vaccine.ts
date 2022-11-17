export default class Vaccine {
  constructor(
    name: string,
    numberOfDoses: number,
    description: string,
    userId: number,
    image: string
  ) {
    this.name = name;
    this.numberOfDoses = numberOfDoses;
    this.description = description;
    this.userId = userId;
    this.image = image;
  }

  id!: number;
  name!: string;
  description!: string;
  numberOfDoses!: number;
  userId!: number;
  image!: string;
}
