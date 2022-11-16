export default class Vaccine {
  constructor(name: string, numberOfDoses: number, description: string, userId: number) {
    this.name = name;
    this.numberOfDoses = numberOfDoses;
    this.description = description;
		this.userId = userId
  }

  id!: number;
  name!: string;
  description!: string;
  numberOfDoses!: number;
	userId!: number;
}
